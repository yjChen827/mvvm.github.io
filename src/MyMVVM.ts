
import {MyObserver} from "./MyObserver";
import {MyCompile} from "./MyCompile";

export class MyMVVM {
    // 字段
    $el: string| object| null  // 模板id
    $data: any   // 数据
    $methods: any // 方法
    $observer: MyObserver | undefined
    $compile: MyCompile | undefined
    [key: string]: any  // 用于动态添加属性

    // 构造函数 options: 可选的属性
    constructor(options: { el: string| object| null; data: object| null; methods: any; }) {
        // 把el和data和methods绑定到this实例上
        this.$el = options.el
        this.$data = options.data
        this.$methods = options.methods

        if (this.$data) {
            // 把数据传给observer 由它来监视
            this.$observer = new MyObserver(this.$data)
            // 数据代理
            this.proxy(this.$data)
        }

        // 解析el
        if (this.$el) {
            // 由compile解析模板内容 参数为整个mvvm实例
            this.$compile = new MyCompile(this.$el, this)
        }
    }

    // 数据代理 用mvvm.key来代替mvvm.$data.key
    proxy(data: any) {
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                enumerable: true,
                configurable: true,
                get() {
                    return data[key]
                },
                set(newValue) {
                    if (data[key] !== newValue) {
                        data[key] = newValue
                    }
                }
            })
        })
    }
}

Object.defineProperty(window, "MyMVVM", {
    enumerable: true, // 可遍历
    configurable: true, // 可修改
    get(){return MyMVVM},
})

