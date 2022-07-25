import {MyMVVM} from "../src/MyMVVM";
import {getData, setData} from "../src/util";

describe("测试util", ()=> {
    test("测试getData", ()=> {
        let mvvm = new MyMVVM({
            el: "app",
            data: {
                person: {
                    name: "张三",
                    age: 18
                }
            },
            methods: {}
        })

        let name = getData(mvvm, "person.name")
        let age = getData(mvvm, "person.age")
        let none = getData(mvvm, "person.gender")  // 获取不存在的属性值

        expect(name).toBe(mvvm.$data.person.name)
        expect(age).toBe(mvvm.$data.person.age)
        expect(none).toBe('')

    })
    test("测试setData", ()=> {
        let mvvm = new MyMVVM({
            el: "app",
            data: {
                person: {
                    name: "张三",
                    age: 18
                }
            },
            methods: {}
        })

        setData(mvvm, "person.name", "李四")
        expect(mvvm.$data.person.name).toBe("李四")
        setData(mvvm, "person.age", 19)
        expect(mvvm.$data.person.age).toBe(19)
    })
})