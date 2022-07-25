import {InstructionParserFactory} from "./InstructionParser/InstructionParserFactory";
import {getData} from "./util";
import {MyWatcher} from "./MyWatcher";

export class MyCompile{
    // 字段
    el: any
    mvvm: any


    // 构造函数
    constructor(el: string| object| null, mvvm: object| null) {
        // 通过id拿到dom元素对象
        if(typeof el == "string")
            this.el = document.querySelector(el)
        else
            this.el = el

        this.mvvm = mvvm

        // 编译模板
        if(this.el){
            // 1.把el中所有的子节点放入到内存中fragment
            let fragment = this.nodeToFragment(this.el)
            // 2.在内存中编译fragment
            this.compile(fragment)
            // 3.把fragment一次性添加到页面中 => 提高效率
            this.el.appendChild(fragment)
        }
    }

    // 编译文档碎片 => 深度优先遍历
    compile(fragment: DocumentFragment){
        let allChildNodes: NodeListOf<ChildNode> = fragment.childNodes
        this.toArray(allChildNodes).forEach((item: any) => {
            // 编译子节点
            // 元素(nodeType=1)=> 解析指令 v-text/v-html/v-model/v-on
            // 文本节点(nodeType=3) => 解析插值表达式 {{}}
            if(item.nodeType === 1){
                this.compileElement(item)
            }else if(item.nodeType === 3){
                this.compileText(item)
            }

            // 如果当前节点有子节点，递归解析子节点

            if(item.childNodes && item.childNodes.length >0){
                this.compile(item)
            }
        })
    }

    /**
     * 解析指令
     * @param node 当前节点
     */
    compileElement(node: any){
        // 获取当前节点的属性
        let attributes = node.attributes

        this.toArray(attributes).forEach((attr :any) => {

            let parser: any;  // 指令解析器
            let nodeName = attr.nodeName  // 属性名
            let nodeValue = attr.nodeValue // 属性值

            // 只解析v-开头的指令
            if(this.isInstruction(nodeName)){
                let type = nodeName.slice(2)  //去掉v-,拿出指令类型
                if(this.isEventInstruction(type)) {
                    // 事件指令: v-on
                    parser = InstructionParserFactory.createParser('on')
                    // 设置事件类型
                    parser.eventType = this.getEventType(nodeName)
                }else if(this.isAttrInstruction(type)){
                    // v-bind指令
                    parser = InstructionParserFactory.createParser('bind')
                    // 设置绑定属性
                    parser.attr = this.getAttrType(nodeName)
                }else{
                    // 数据指令: v-text/html/model
                    parser = InstructionParserFactory.createParser(type);
                }
                // 执行解析指令
                parser.parse(this.mvvm, node, nodeValue)
            }
        })
    }

    /**
     * 解析文本节点
     * @param node
     */
    compileText(node: any){
        // 原始数据
        let rawText = node.textContent
        // 给当前节点添加一个rawTextContent属性
        // rawTextContent是保留{{}}的数据：为了防止oldValue=''时不知道原先替换的位置
        Object.defineProperty(node, "rawTextContent", {
            get(){
                return rawText
            },
            set(newValue){
                rawText = newValue
            }
        })

        // 用正则表达式匹配插值表达式{{}}
        // 要使用的惰性匹配and多次匹配:因为有可能会有多个{{}}
        let re = /\{\{(.+?)\}\}/g

        if(re.test(rawText)){
            // 拿出{{}}中的内容 替换成data对应的值
            // 注意nodeValue的格式为{{expr}}
            let nodeValues = rawText.match(re)
            // 遍历每一个插值语句
            nodeValues.forEach((item: string) => {
                let data = getData(this.mvvm, item.slice(2,item.length-2))

                // 先修改原始表达式
                node.rawTextContent = node.rawTextContent.replace(item, '{{'+data+'}}')

                // 将修改后的原始表达式删除所有{{和}}即可得到插值后的表达式
                let text = node.rawTextContent
                while(text.indexOf('{{') !== -1 && text.indexOf("}}") !== -1){
                    text =text.replace("{{", "")
                    text = text.replace('}}', '')
                }
                node.textContent = text

                // 给该插值表达式注册监听(订阅使用的数据)
                new MyWatcher(this.mvvm, item.slice(2,item.length-2), (newValue: string, oldValue: string) => {
                    let oldRawValue = "{{"+oldValue+"}}"
                    let newRawValue = "{{"+newValue+"}}"
                    // 先修改原始表达式
                    node.rawTextContent = node.rawTextContent.replace(oldRawValue, newRawValue)
                    // 删除原始表达式的所有{{和}}
                    let text = node.rawTextContent
                    while(text.indexOf('{{') !== -1 && text.indexOf("}}") !== -1){
                        text =text.replace("{{", "")
                        text = text.replace('}}', '')
                    }
                    node.textContent = text
                })
            })
        }
    }


    // 工具方法
    /**
     * 把节点转换成fragment
     * @param parentNode
     * @returns {DocumentFragment}
     */
    nodeToFragment(parentNode: any){
        let fragment = document.createDocumentFragment()
        // 遍历把所有子节点加到fragment中
        let allChildNodes = parentNode.childNodes
        this.toArray(allChildNodes).forEach(item => {
            fragment.appendChild(item)
        })
        return fragment
    }

    /**
     * 把类数组转换为数组，方便forEach遍历
     * @param tmp
     * @returns {*[]}
     */
    toArray(tmp: NodeListOf<ChildNode>){
        return [].slice.call(tmp)
    }

    /**
     * 判断当前属性是否为要解析的指令
     * @param nodeName 属性名
     * @returns {boolean}
     */
    isInstruction(nodeName: string){
        // 要解析的指令的前缀(可修改性)
        let pre = "v-"
        return nodeName.startsWith(pre)
    }

    /**
     * 判断当前指令是不是事件指令
     * @param nodeName 属性名
     */
    isEventInstruction(nodeName: string){
        return nodeName.split(':')[0] === 'on'
    }

    /**
     * 判断指令是不是属性指令
     * @param nodeName
     */
    isAttrInstruction(nodeName: string){
        return nodeName.split(':')[0] === 'bind'
    }

    /**
     * 获取要注册的事件类型
     * @param nodeName
     */
    getEventType(nodeName: string){
        return nodeName.split(':')[1]
    }

    /**
     * 获取要绑定的属性类型
     * @param nodeName
     */
    getAttrType(nodeName: string){
        return nodeName.split(':')[1]
    }
}