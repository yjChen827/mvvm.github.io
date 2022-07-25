import {Dependence} from "./MyWatcher";
// 数据改变时 让页面上的数据也同步改变 ===> 数据劫持
// 核心：Object.defineProperty(obj, prop, description) 给obj对象的prop属性增加描述符
// description中get和set会进行数据劫持：每次获取数据属性就会被get方法劫持，修改数据就会被set方法劫持

// 数据监视器
export class MyObserver {

    // 要监视的数据
    data: any

    constructor(data: any) {
        this.data = data
        // 监视数据
        this.observe(this.data)
    }

    // 给每个data添加数据劫持(需要递归进行)
    observe(data: any){
        // 递归结束条件
        if(!data || typeof data != "object"){
            return
        }

        // 给data对象的每一个属性添加数据劫持
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key])
            // 递归
            this.observe(data[key])
        })
    }

    // 数据劫持：给数据添加getter和setter
    defineReactive(data: { [x: string]: any; }, key: PropertyKey, value: any){
        // 保存this 方便setter里使用
        let self  = this
        // 每个数据持有一个dep,其中包含所有订阅该数据的订阅者
        let dep = new Dependence()
        // 给data的key属性添加一个getter和setter
        Object.defineProperty(data, key, {
            enumerable: true, // 可遍历
            configurable: true, // 可修改
            get(){
                // 如果Dependence.target中有watcher对象，就存储到这个数据的dep对象的数组中
                Dependence.target && dep.addSub(Dependence.target)
                return value
            },
            set(newValue){
                value = newValue

                // 如果newValue是一个新的对象，也需要对其进行劫持
                // self是observer对象
                self.observe(newValue)

                // 一旦数据被改变 通知所有订阅该数据的订阅者更新数据
                dep.notify_all()
            }
        })
    }
}
