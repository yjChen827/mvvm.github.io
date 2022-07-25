import {getData} from "./util";


export class MyWatcher {
    // 字段
    mvvm: any
    expr: string   // 属性
    callback: any // 回调函数
    oldValue: any  // 保存当前值


    /**
     * 构造函数
     * @param mvvm 当前的实例
     * @param expr 订阅的数据(key)
     * @param callback 当数据发生改变，需要调用cb函数
     */
    constructor(mvvm: any, expr: string, callback: any) {
        this.mvvm = mvvm
        this.expr = expr
        this.callback = callback

        // 把新创建的watcher对象暂时存储到Dependence的target中
        Dependence.target = this

        // 如何知道数据有没有发生改变
        // 把expr的旧值保存起来
        // 并且会把watcher添加到Dep数组中
        this.oldValue = getData(mvvm, expr)

        // 清空Dependence.target，给创建下一个watcher用
        // @ts-ignore
        Dependence.target = null;
    }

    // public方法 用于更新页面数据
    // 当数据被set时，由数据劫持，可以在setter里调用update方法
    update(){
        // 看expr的数据是否发生改变 如果发生改变，则调用回调函数
        let oldValue = this.oldValue
        let newValue = getData(this.mvvm, this.expr)

        if(oldValue !== newValue){
            this.callback(newValue, oldValue)
        }

        // 修改旧值
        this.oldValue = newValue
    }
}


// Watcher(订阅者)的集合
export class Dependence{
    // 所有订阅者
    subscribers: MyWatcher[]
    // 暂时存放watcher对象
    static target: MyWatcher

    constructor() {
        // 管理所有订阅者
        this.subscribers = []
    }

    // 添加订阅者
    addSub(watcher: MyWatcher){
        this.subscribers.push(watcher)
    }

    // 发布消息
    notify_all(){
        // 遍历所有订阅者，调用update方法
        this.subscribers.forEach(sub => {
            sub.update()
        })
    }
}