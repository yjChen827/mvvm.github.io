import {MyMVVM} from "../src/MyMVVM";

describe("测试MyMVVM", ()=> {
    test("测试MyMVVM的构造函数", ()=> {
        const mvvm = new MyMVVM({
            el: "app",
            data: {
                welcome: "Hello"
            },
            methods: {
                func(){
                    console.log("调用方法")
                }
            }
        })
        expect(mvvm.welcome).toBe(mvvm.$data.welcome)
        mvvm.welcome = "Hi"
        expect(mvvm.$data.welcome).toBe("Hi")
        mvvm.welcome = "Hi"  // 再次修改
        expect(mvvm.$data.welcome).toBe("Hi")
    })

})