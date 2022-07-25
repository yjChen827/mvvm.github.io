import {MyMVVM} from "../src/MyMVVM";
import {MyCompile} from "../src/MyCompile";
import {MyObserver} from "../src/MyObserver";


describe("测试MyWatcher", ()=> {
    test("测试插值语法的watcher", ()=> {
        let node = document.createElement("p")
        node.textContent = "{{welcome}}"
        node.setAttribute("id", "app")

        let mvvm = new MyMVVM({el: null, data: null, methods: null})
        mvvm.$data = {
            welcome: "Hello"
        }
        mvvm.$observer = new MyObserver(mvvm.$data)

        let compile = new MyCompile(null, null)
        compile.mvvm = mvvm
        compile.compileText(node)

        // 修改data中welcome的值,看页面是否重新渲染
        mvvm.$data.welcome = "Hi"
        expect(node.textContent).toBe("Hi")
    })

    test("测试v-text的watcher", ()=> {
        let node = document.createElement("p")
        node.setAttribute("v-text", "msg")

        let mvvm = new MyMVVM({el: null, data: null, methods: null})
        mvvm.$data = {
            msg: 'This is a message'
        }
        mvvm.$observer = new MyObserver(mvvm.$data)

        let compile = new MyCompile(null, null)
        compile.mvvm = mvvm
        compile.compileElement(node)

        // 修改data中的数据
        mvvm.$data.msg = "This is a new message"
        expect(node.textContent).toBe("This is a new message")
    })

    test("测试v-html的watcher", ()=> {
        let node = document.createElement("p")
        node.setAttribute("v-html", "html")

        let mvvm = new MyMVVM({el: null, data: null, methods: null})
        mvvm.$data = {
            html: '<h1>这是一个标题</h1>'
        }
        mvvm.$observer = new MyObserver(mvvm.$data)

        let compile = new MyCompile(null, null)
        compile.mvvm = mvvm
        compile.compileElement(node)

        // 修改data中的html
        mvvm.$data.html = '<h2>这是一个新的标题</h2>'
        expect(node.innerHTML).toBe(mvvm.$data.html)
    })

    test("测试v-bind的watcher", ()=> {
        let node = document.createElement("p")
        node.setAttribute("v-bind:title", "title")

        let mvvm = new MyMVVM({el: null, data: null, methods: null})
        mvvm.$data = {
            title: '标题'
        }
        mvvm.$observer = new MyObserver(mvvm.$data)

        let compile = new MyCompile(null, null)
        compile.mvvm = mvvm
        compile.compileElement(node)

        // 修改title 看node的title属性值是否改变
        mvvm.$data.title = "新标题"
        expect(node.getAttribute("title")).toBe(mvvm.$data.title)
    })
})