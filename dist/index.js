/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/InstructionParser/Impl/BindInstructionParser.ts":
/*!*************************************************************!*\
  !*** ./src/InstructionParser/Impl/BindInstructionParser.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.BindInstructionParser = void 0;\r\nconst util_1 = __webpack_require__(/*! ../../util */ \"./src/util.ts\");\r\nconst MyWatcher_1 = __webpack_require__(/*! ../../MyWatcher */ \"./src/MyWatcher.ts\");\r\nclass BindInstructionParser {\r\n    parse(mvvm, node, expr) {\r\n        let data = (0, util_1.getData)(mvvm, expr); // 属性值\r\n        // 给node设置该属性的值\r\n        node.setAttribute(this.attr, data);\r\n        // 注册监听\r\n        new MyWatcher_1.MyWatcher(mvvm, expr, (newValue, oldValue) => {\r\n            node.setAttribute(this.attr, newValue);\r\n        });\r\n    }\r\n}\r\nexports.BindInstructionParser = BindInstructionParser;\r\n\n\n//# sourceURL=webpack://project4/./src/InstructionParser/Impl/BindInstructionParser.ts?");

/***/ }),

/***/ "./src/InstructionParser/Impl/HtmlInstructionParser.ts":
/*!*************************************************************!*\
  !*** ./src/InstructionParser/Impl/HtmlInstructionParser.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.HtmlInstructionParser = void 0;\r\nconst util_1 = __webpack_require__(/*! ../../util */ \"./src/util.ts\");\r\nconst MyWatcher_1 = __webpack_require__(/*! ../../MyWatcher */ \"./src/MyWatcher.ts\");\r\nclass HtmlInstructionParser {\r\n    parse(mvvm, node, expr) {\r\n        node.innerHTML = (0, util_1.getData)(mvvm, expr);\r\n        // 注册监听\r\n        new MyWatcher_1.MyWatcher(mvvm, expr, (newValue, oldValue) => {\r\n            node.innerHTML = newValue;\r\n        });\r\n    }\r\n}\r\nexports.HtmlInstructionParser = HtmlInstructionParser;\r\n\n\n//# sourceURL=webpack://project4/./src/InstructionParser/Impl/HtmlInstructionParser.ts?");

/***/ }),

/***/ "./src/InstructionParser/Impl/ModelInstructionParser.ts":
/*!**************************************************************!*\
  !*** ./src/InstructionParser/Impl/ModelInstructionParser.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.ModelInstructionParser = void 0;\r\nconst util_1 = __webpack_require__(/*! ../../util */ \"./src/util.ts\");\r\nconst MyWatcher_1 = __webpack_require__(/*! ../../MyWatcher */ \"./src/MyWatcher.ts\");\r\nclass ModelInstructionParser {\r\n    parse(mvvm, node, expr) {\r\n        node.value = (0, util_1.getData)(mvvm, expr);\r\n        // 实现双向数据绑定\r\n        // 给node注册input事件，当input框里的value值发生改变时，修改对应的data中的数据\r\n        node.addEventListener('input', function () {\r\n            // 回调函数：修改值\r\n            (0, util_1.setData)(mvvm, expr, node.value);\r\n        });\r\n        // 注册监听\r\n        new MyWatcher_1.MyWatcher(mvvm, expr, (newValue, oldValue) => {\r\n            node.value = newValue;\r\n        });\r\n    }\r\n}\r\nexports.ModelInstructionParser = ModelInstructionParser;\r\n\n\n//# sourceURL=webpack://project4/./src/InstructionParser/Impl/ModelInstructionParser.ts?");

/***/ }),

/***/ "./src/InstructionParser/Impl/OnInstructionParser.ts":
/*!***********************************************************!*\
  !*** ./src/InstructionParser/Impl/OnInstructionParser.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.OnInstructionParser = void 0;\r\nclass OnInstructionParser {\r\n    parse(mvvm, node, expr) {\r\n        // 给节点添加事件监听器 并且要修改func方法中的this指向，bind到mvvm上\r\n        let func = mvvm.$methods && mvvm.$methods[expr];\r\n        node.addEventListener(this.eventType, func.bind(mvvm));\r\n    }\r\n}\r\nexports.OnInstructionParser = OnInstructionParser;\r\n\n\n//# sourceURL=webpack://project4/./src/InstructionParser/Impl/OnInstructionParser.ts?");

/***/ }),

/***/ "./src/InstructionParser/Impl/TextInstructionParser.ts":
/*!*************************************************************!*\
  !*** ./src/InstructionParser/Impl/TextInstructionParser.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.TextInstructionParser = void 0;\r\nconst util_1 = __webpack_require__(/*! ../../util */ \"./src/util.ts\");\r\nconst MyWatcher_1 = __webpack_require__(/*! ../../MyWatcher */ \"./src/MyWatcher.ts\");\r\nclass TextInstructionParser {\r\n    parse(mvvm, node, expr) {\r\n        node.textContent = (0, util_1.getData)(mvvm, expr);\r\n        // 注册监听\r\n        new MyWatcher_1.MyWatcher(mvvm, expr, (newValue, oldValue) => {\r\n            node.textContent = newValue;\r\n        });\r\n    }\r\n}\r\nexports.TextInstructionParser = TextInstructionParser;\r\n\n\n//# sourceURL=webpack://project4/./src/InstructionParser/Impl/TextInstructionParser.ts?");

/***/ }),

/***/ "./src/InstructionParser/InstructionParserFactory.ts":
/*!***********************************************************!*\
  !*** ./src/InstructionParser/InstructionParserFactory.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.InstructionParserFactory = void 0;\r\nconst TextInstructionParser_1 = __webpack_require__(/*! ./Impl/TextInstructionParser */ \"./src/InstructionParser/Impl/TextInstructionParser.ts\");\r\nconst HtmlInstructionParser_1 = __webpack_require__(/*! ./Impl/HtmlInstructionParser */ \"./src/InstructionParser/Impl/HtmlInstructionParser.ts\");\r\nconst ModelInstructionParser_1 = __webpack_require__(/*! ./Impl/ModelInstructionParser */ \"./src/InstructionParser/Impl/ModelInstructionParser.ts\");\r\nconst OnInstructionParser_1 = __webpack_require__(/*! ./Impl/OnInstructionParser */ \"./src/InstructionParser/Impl/OnInstructionParser.ts\");\r\nconst BindInstructionParser_1 = __webpack_require__(/*! ./Impl/BindInstructionParser */ \"./src/InstructionParser/Impl/BindInstructionParser.ts\");\r\n// 指令解析器工厂\r\nclass InstructionParserFactory {\r\n    /**\r\n     * 根据type创建对应的指令解析器\r\n     * @param type\r\n     */\r\n    static createParser(type) {\r\n        switch (type) {\r\n            case 'text':\r\n                return new TextInstructionParser_1.TextInstructionParser();\r\n            case 'html':\r\n                return new HtmlInstructionParser_1.HtmlInstructionParser();\r\n            case 'model':\r\n                return new ModelInstructionParser_1.ModelInstructionParser();\r\n            case 'on':\r\n                return new OnInstructionParser_1.OnInstructionParser();\r\n            case 'bind':\r\n                return new BindInstructionParser_1.BindInstructionParser();\r\n        }\r\n    }\r\n}\r\nexports.InstructionParserFactory = InstructionParserFactory;\r\n\n\n//# sourceURL=webpack://project4/./src/InstructionParser/InstructionParserFactory.ts?");

/***/ }),

/***/ "./src/MyCompile.ts":
/*!**************************!*\
  !*** ./src/MyCompile.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.MyCompile = void 0;\r\nconst InstructionParserFactory_1 = __webpack_require__(/*! ./InstructionParser/InstructionParserFactory */ \"./src/InstructionParser/InstructionParserFactory.ts\");\r\nconst util_1 = __webpack_require__(/*! ./util */ \"./src/util.ts\");\r\nconst MyWatcher_1 = __webpack_require__(/*! ./MyWatcher */ \"./src/MyWatcher.ts\");\r\nclass MyCompile {\r\n    // 构造函数\r\n    constructor(el, mvvm) {\r\n        // 通过id拿到dom元素对象\r\n        if (typeof el == \"string\")\r\n            this.el = document.querySelector(el);\r\n        else\r\n            this.el = el;\r\n        this.mvvm = mvvm;\r\n        // 编译模板\r\n        if (this.el) {\r\n            // 1.把el中所有的子节点放入到内存中fragment\r\n            let fragment = this.nodeToFragment(this.el);\r\n            // 2.在内存中编译fragment\r\n            this.compile(fragment);\r\n            // 3.把fragment一次性添加到页面中 => 提高效率\r\n            this.el.appendChild(fragment);\r\n        }\r\n    }\r\n    // 编译文档碎片 => 深度优先遍历\r\n    compile(fragment) {\r\n        let allChildNodes = fragment.childNodes;\r\n        this.toArray(allChildNodes).forEach((item) => {\r\n            // 编译子节点\r\n            // 元素(nodeType=1)=> 解析指令 v-text/v-html/v-model/v-on\r\n            // 文本节点(nodeType=3) => 解析插值表达式 {{}}\r\n            if (item.nodeType === 1) {\r\n                this.compileElement(item);\r\n            }\r\n            else if (item.nodeType === 3) {\r\n                this.compileText(item);\r\n            }\r\n            // 如果当前节点有子节点，递归解析子节点\r\n            if (item.childNodes && item.childNodes.length > 0) {\r\n                this.compile(item);\r\n            }\r\n        });\r\n    }\r\n    /**\r\n     * 解析指令\r\n     * @param node 当前节点\r\n     */\r\n    compileElement(node) {\r\n        // 获取当前节点的属性\r\n        let attributes = node.attributes;\r\n        this.toArray(attributes).forEach((attr) => {\r\n            let parser; // 指令解析器\r\n            let nodeName = attr.nodeName; // 属性名\r\n            let nodeValue = attr.nodeValue; // 属性值\r\n            // 只解析v-开头的指令\r\n            if (this.isInstruction(nodeName)) {\r\n                let type = nodeName.slice(2); //去掉v-,拿出指令类型\r\n                if (this.isEventInstruction(type)) {\r\n                    // 事件指令: v-on\r\n                    parser = InstructionParserFactory_1.InstructionParserFactory.createParser('on');\r\n                    // 设置事件类型\r\n                    parser.eventType = this.getEventType(nodeName);\r\n                }\r\n                else if (this.isAttrInstruction(type)) {\r\n                    // v-bind指令\r\n                    parser = InstructionParserFactory_1.InstructionParserFactory.createParser('bind');\r\n                    // 设置绑定属性\r\n                    parser.attr = this.getAttrType(nodeName);\r\n                }\r\n                else {\r\n                    // 数据指令: v-text/html/model\r\n                    parser = InstructionParserFactory_1.InstructionParserFactory.createParser(type);\r\n                }\r\n                // 执行解析指令\r\n                parser.parse(this.mvvm, node, nodeValue);\r\n            }\r\n        });\r\n    }\r\n    /**\r\n     * 解析文本节点\r\n     * @param node\r\n     */\r\n    compileText(node) {\r\n        // 原始数据\r\n        let rawText = node.textContent;\r\n        // 给当前节点添加一个rawTextContent属性\r\n        // rawTextContent是保留{{}}的数据：为了防止oldValue=''时不知道原先替换的位置\r\n        Object.defineProperty(node, \"rawTextContent\", {\r\n            get() {\r\n                return rawText;\r\n            },\r\n            set(newValue) {\r\n                rawText = newValue;\r\n            }\r\n        });\r\n        // 用正则表达式匹配插值表达式{{}}\r\n        // 要使用的惰性匹配and多次匹配:因为有可能会有多个{{}}\r\n        let re = /\\{\\{(.+?)\\}\\}/g;\r\n        if (re.test(rawText)) {\r\n            // 拿出{{}}中的内容 替换成data对应的值\r\n            // 注意nodeValue的格式为{{expr}}\r\n            let nodeValues = rawText.match(re);\r\n            // 遍历每一个插值语句\r\n            nodeValues.forEach((item) => {\r\n                let data = (0, util_1.getData)(this.mvvm, item.slice(2, item.length - 2));\r\n                // 先修改原始表达式\r\n                node.rawTextContent = node.rawTextContent.replace(item, '{{' + data + '}}');\r\n                // 将修改后的原始表达式删除所有{{和}}即可得到插值后的表达式\r\n                let text = node.rawTextContent;\r\n                while (text.indexOf('{{') !== -1 && text.indexOf(\"}}\") !== -1) {\r\n                    text = text.replace(\"{{\", \"\");\r\n                    text = text.replace('}}', '');\r\n                }\r\n                node.textContent = text;\r\n                // 给该插值表达式注册监听(订阅使用的数据)\r\n                new MyWatcher_1.MyWatcher(this.mvvm, item.slice(2, item.length - 2), (newValue, oldValue) => {\r\n                    let oldRawValue = \"{{\" + oldValue + \"}}\";\r\n                    let newRawValue = \"{{\" + newValue + \"}}\";\r\n                    // 先修改原始表达式\r\n                    node.rawTextContent = node.rawTextContent.replace(oldRawValue, newRawValue);\r\n                    // 删除原始表达式的所有{{和}}\r\n                    let text = node.rawTextContent;\r\n                    while (text.indexOf('{{') !== -1 && text.indexOf(\"}}\") !== -1) {\r\n                        text = text.replace(\"{{\", \"\");\r\n                        text = text.replace('}}', '');\r\n                    }\r\n                    node.textContent = text;\r\n                });\r\n            });\r\n        }\r\n    }\r\n    // 工具方法\r\n    /**\r\n     * 把节点转换成fragment\r\n     * @param parentNode\r\n     * @returns {DocumentFragment}\r\n     */\r\n    nodeToFragment(parentNode) {\r\n        let fragment = document.createDocumentFragment();\r\n        // 遍历把所有子节点加到fragment中\r\n        let allChildNodes = parentNode.childNodes;\r\n        this.toArray(allChildNodes).forEach(item => {\r\n            fragment.appendChild(item);\r\n        });\r\n        return fragment;\r\n    }\r\n    /**\r\n     * 把类数组转换为数组，方便forEach遍历\r\n     * @param tmp\r\n     * @returns {*[]}\r\n     */\r\n    toArray(tmp) {\r\n        return [].slice.call(tmp);\r\n    }\r\n    /**\r\n     * 判断当前属性是否为要解析的指令\r\n     * @param nodeName 属性名\r\n     * @returns {boolean}\r\n     */\r\n    isInstruction(nodeName) {\r\n        // 要解析的指令的前缀(可修改性)\r\n        let pre = \"v-\";\r\n        return nodeName.startsWith(pre);\r\n    }\r\n    /**\r\n     * 判断当前指令是不是事件指令\r\n     * @param nodeName 属性名\r\n     */\r\n    isEventInstruction(nodeName) {\r\n        return nodeName.split(':')[0] === 'on';\r\n    }\r\n    /**\r\n     * 判断指令是不是属性指令\r\n     * @param nodeName\r\n     */\r\n    isAttrInstruction(nodeName) {\r\n        return nodeName.split(':')[0] === 'bind';\r\n    }\r\n    /**\r\n     * 获取要注册的事件类型\r\n     * @param nodeName\r\n     */\r\n    getEventType(nodeName) {\r\n        return nodeName.split(':')[1];\r\n    }\r\n    /**\r\n     * 获取要绑定的属性类型\r\n     * @param nodeName\r\n     */\r\n    getAttrType(nodeName) {\r\n        return nodeName.split(':')[1];\r\n    }\r\n}\r\nexports.MyCompile = MyCompile;\r\n\n\n//# sourceURL=webpack://project4/./src/MyCompile.ts?");

/***/ }),

/***/ "./src/MyMVVM.ts":
/*!***********************!*\
  !*** ./src/MyMVVM.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.MyMVVM = void 0;\r\nconst MyObserver_1 = __webpack_require__(/*! ./MyObserver */ \"./src/MyObserver.ts\");\r\nconst MyCompile_1 = __webpack_require__(/*! ./MyCompile */ \"./src/MyCompile.ts\");\r\nclass MyMVVM {\r\n    // 构造函数 options: 可选的属性\r\n    constructor(options) {\r\n        // 把el和data和methods绑定到this实例上\r\n        this.$el = options.el;\r\n        this.$data = options.data;\r\n        this.$methods = options.methods;\r\n        if (this.$data) {\r\n            // 把数据传给observer 由它来监视\r\n            this.$observer = new MyObserver_1.MyObserver(this.$data);\r\n            // 数据代理\r\n            this.proxy(this.$data);\r\n        }\r\n        // 解析el\r\n        if (this.$el) {\r\n            // 由compile解析模板内容 参数为整个mvvm实例\r\n            this.$compile = new MyCompile_1.MyCompile(this.$el, this);\r\n        }\r\n    }\r\n    // 数据代理 用mvvm.key来代替mvvm.$data.key\r\n    proxy(data) {\r\n        Object.keys(data).forEach(key => {\r\n            Object.defineProperty(this, key, {\r\n                enumerable: true,\r\n                configurable: true,\r\n                get() {\r\n                    return data[key];\r\n                },\r\n                set(newValue) {\r\n                    if (data[key] !== newValue) {\r\n                        data[key] = newValue;\r\n                    }\r\n                }\r\n            });\r\n        });\r\n    }\r\n}\r\nexports.MyMVVM = MyMVVM;\r\nObject.defineProperty(window, \"MyMVVM\", {\r\n    enumerable: true,\r\n    configurable: true,\r\n    get() { return MyMVVM; },\r\n});\r\n\n\n//# sourceURL=webpack://project4/./src/MyMVVM.ts?");

/***/ }),

/***/ "./src/MyObserver.ts":
/*!***************************!*\
  !*** ./src/MyObserver.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.MyObserver = void 0;\r\nconst MyWatcher_1 = __webpack_require__(/*! ./MyWatcher */ \"./src/MyWatcher.ts\");\r\n// 数据改变时 让页面上的数据也同步改变 ===> 数据劫持\r\n// 核心：Object.defineProperty(obj, prop, description) 给obj对象的prop属性增加描述符\r\n// description中get和set会进行数据劫持：每次获取数据属性就会被get方法劫持，修改数据就会被set方法劫持\r\n// 数据监视器\r\nclass MyObserver {\r\n    constructor(data) {\r\n        this.data = data;\r\n        // 监视数据\r\n        this.observe(this.data);\r\n    }\r\n    // 给每个data添加数据劫持(需要递归进行)\r\n    observe(data) {\r\n        // 递归结束条件\r\n        if (!data || typeof data != \"object\") {\r\n            return;\r\n        }\r\n        // 给data对象的每一个属性添加数据劫持\r\n        Object.keys(data).forEach(key => {\r\n            this.defineReactive(data, key, data[key]);\r\n            // 递归\r\n            this.observe(data[key]);\r\n        });\r\n    }\r\n    // 数据劫持：给数据添加getter和setter\r\n    defineReactive(data, key, value) {\r\n        // 保存this 方便setter里使用\r\n        let self = this;\r\n        // 每个数据持有一个dep,其中包含所有订阅该数据的订阅者\r\n        let dep = new MyWatcher_1.Dependence();\r\n        // 给data的key属性添加一个getter和setter\r\n        Object.defineProperty(data, key, {\r\n            enumerable: true,\r\n            configurable: true,\r\n            get() {\r\n                // 如果Dependence.target中有watcher对象，就存储到这个数据的dep对象的数组中\r\n                MyWatcher_1.Dependence.target && dep.addSub(MyWatcher_1.Dependence.target);\r\n                return value;\r\n            },\r\n            set(newValue) {\r\n                value = newValue;\r\n                // 如果newValue是一个新的对象，也需要对其进行劫持\r\n                // self是observer对象\r\n                self.observe(newValue);\r\n                // 一旦数据被改变 通知所有订阅该数据的订阅者更新数据\r\n                dep.notify_all();\r\n            }\r\n        });\r\n    }\r\n}\r\nexports.MyObserver = MyObserver;\r\n\n\n//# sourceURL=webpack://project4/./src/MyObserver.ts?");

/***/ }),

/***/ "./src/MyWatcher.ts":
/*!**************************!*\
  !*** ./src/MyWatcher.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Dependence = exports.MyWatcher = void 0;\r\nconst util_1 = __webpack_require__(/*! ./util */ \"./src/util.ts\");\r\nclass MyWatcher {\r\n    /**\r\n     * 构造函数\r\n     * @param mvvm 当前的实例\r\n     * @param expr 订阅的数据(key)\r\n     * @param callback 当数据发生改变，需要调用cb函数\r\n     */\r\n    constructor(mvvm, expr, callback) {\r\n        this.mvvm = mvvm;\r\n        this.expr = expr;\r\n        this.callback = callback;\r\n        // 把新创建的watcher对象暂时存储到Dependence的target中\r\n        Dependence.target = this;\r\n        // 如何知道数据有没有发生改变\r\n        // 把expr的旧值保存起来\r\n        // 并且会把watcher添加到Dep数组中\r\n        this.oldValue = (0, util_1.getData)(mvvm, expr);\r\n        // 清空Dependence.target，给创建下一个watcher用\r\n        // @ts-ignore\r\n        Dependence.target = null;\r\n    }\r\n    // public方法 用于更新页面数据\r\n    // 当数据被set时，由数据劫持，可以在setter里调用update方法\r\n    update() {\r\n        // 看expr的数据是否发生改变 如果发生改变，则调用回调函数\r\n        let oldValue = this.oldValue;\r\n        let newValue = (0, util_1.getData)(this.mvvm, this.expr);\r\n        if (oldValue !== newValue) {\r\n            this.callback(newValue, oldValue);\r\n        }\r\n        // 修改旧值\r\n        this.oldValue = newValue;\r\n    }\r\n}\r\nexports.MyWatcher = MyWatcher;\r\n// Watcher(订阅者)的集合\r\nclass Dependence {\r\n    constructor() {\r\n        // 管理所有订阅者\r\n        this.subscribers = [];\r\n    }\r\n    // 添加订阅者\r\n    addSub(watcher) {\r\n        this.subscribers.push(watcher);\r\n    }\r\n    // 发布消息\r\n    notify_all() {\r\n        // 遍历所有订阅者，调用update方法\r\n        this.subscribers.forEach(sub => {\r\n            sub.update();\r\n        });\r\n    }\r\n}\r\nexports.Dependence = Dependence;\r\n\n\n//# sourceURL=webpack://project4/./src/MyWatcher.ts?");

/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.setData = exports.getData = void 0;\r\n/**\r\n * 获取属性expr的值 要迭代获取\r\n * @param mvvm\r\n * @param expr\r\n */\r\nfunction getData(mvvm, expr) {\r\n    // 将nodeValue根据.进行切分\r\n    // data = data[key 1][key 2]...[key n]\r\n    let data = mvvm.$data;\r\n    let keys = expr.split(\".\");\r\n    for (const key of keys) {\r\n        if (data[key] === undefined)\r\n            return '';\r\n        else\r\n            data = data[key];\r\n    }\r\n    return data;\r\n}\r\nexports.getData = getData;\r\n/**\r\n * 设置属性expr的值 同样要迭代处理\r\n * data[key1][key2]...[key_n] = value\r\n * @param mvvm\r\n * @param expr\r\n * @param value\r\n */\r\nfunction setData(mvvm, expr, value) {\r\n    let data = mvvm.$data;\r\n    let tmp = expr.split(\".\");\r\n    // data[key 1][key 2]...[key n] = value\r\n    tmp.forEach((item, index) => {\r\n        if (index < tmp.length - 1) {\r\n            data = data[item];\r\n        }\r\n        else {\r\n            // 最后一个 直接修改\r\n            data[item] = value;\r\n        }\r\n    });\r\n}\r\nexports.setData = setData;\r\n\n\n//# sourceURL=webpack://project4/./src/util.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/MyMVVM.ts");
/******/ 	
/******/ })()
;