import {MyMVVM} from "../src/MyMVVM";
import {MyCompile} from "../src/MyCompile";
import {MyObserver} from "../src/MyObserver";


describe("测试MyCompile", ()=> {
    test("测试插值语法的解析", ()=> {
        let node = document.createElement("p")
        node.textContent = "{{welcome}}"
        node.setAttribute("id", "app")

        let mvvm = new MyMVVM({el: null, data: null, methods: null})
        mvvm.$data = {
            welcome: "Hello"
        }
        let compile = new MyCompile(null, null)
        compile.mvvm = mvvm

        compile.compileText(node)
        // 验证插值语法是否正确
        expect(node.textContent).toBe("Hello")
    })

    test("测试v-text的解析", ()=> {
        let node = document.createElement("p")
        node.setAttribute("v-text", "msg")

        let mvvm = new MyMVVM({el: null, data: null, methods: null})
        mvvm.$data = {
            msg: 'This is a message'
        }
        let compile = new MyCompile(null, null)
        compile.mvvm = mvvm

        compile.compileElement(node)
        expect(node.textContent).toBe(mvvm.$data.msg)
    })

    test("测试v-html指令的解析", ()=> {
        let node = document.createElement("p")
        node.setAttribute("v-html", "html")

        let mvvm = new MyMVVM({el: null, data: null, methods: null})
        mvvm.$data = {
            html: '<p>这是一个标题</p>'
        }

        let compile = new MyCompile(null, null)
        compile.mvvm = mvvm

        compile.compileElement(node)
        expect(node.innerHTML).toBe(mvvm.$data.html)
    })

    test("测试v-bind指令的解析", ()=> {
        let node = document.createElement("p")
        node.setAttribute("v-bind:title", "title")

        let mvvm = new MyMVVM({el: null, data: null, methods: null})
        mvvm.$data = {
            title: '标题'
        }

        let compile = new MyCompile(null, null)
        compile.mvvm = mvvm
        compile.compileElement(node)
        expect(node.getAttribute("title")).toBe(mvvm.$data.title)
    })

    test("测试v-model指令的解析", ()=> {
        let node = document.createElement("input")
        node.setAttribute("v-model", "input_text")

        let mvvm = new MyMVVM({el: null, data: null, methods: null})
        mvvm.$data = {
            input_text: '请输入内容'
        }
        mvvm.$observer = new MyObserver(mvvm.$data)

        let compile = new MyCompile(null, null)
        compile.mvvm = mvvm
        compile.compileElement(node)

        // 未修改输入框前的内容
        expect(node.value).toBe(mvvm.$data.input_text)
        // 修改输入框的内容
        node.value = "输入的内容"
        node.dispatchEvent(new InputEvent("input"))
        // 验证双向绑定：data中的数据是否改变
        expect(mvvm.$data.input_text).toBe("输入的内容")
    })

    test("测试v-on指令的解析", ()=> {
        let node = document.createElement("button")
        node.setAttribute("v-on:click", "handleClick")

        let mvvm = new MyMVVM({el: null, data: null, methods: null})
        mvvm.$data = {
            num: 1
        }
        mvvm.$methods = {
            handleClick(){
                this.$data.num ++
            }
        }
        mvvm.$observer = new MyObserver(mvvm.$data)
        let compile = new MyCompile(null, null)
        compile.mvvm = mvvm
        compile.compileElement(node)

        // 触发click事件
        node.dispatchEvent(new Event("click"))
        // 判断num是否加一
        expect(mvvm.$data.num).toBe(2)
    })

    test("测试整个compile方法", ()=> {
        let parentNode = document.createElement("div")
        parentNode.setAttribute("id", "app")

        let childNode1 = document.createElement("p")
        childNode1.textContent = "{{welcome}}"

        let childNode2 = document.createElement("p")
        childNode2.setAttribute("v-text", "msg")

        parentNode.appendChild(childNode1)
        parentNode.appendChild(childNode2)

        let mvvm = new MyMVVM({el: null, data: null, methods: null})
        mvvm.$data = {
            welcome: "Hello",
            msg: "This is a message"
        }
        let compile = new MyCompile(parentNode, mvvm)

        expect(childNode1.textContent).toBe(mvvm.$data.welcome)
        expect(childNode2.textContent).toBe(mvvm.$data.msg)
    })

})