import {getData} from "../../util";
import {MyWatcher} from "../../MyWatcher";
import {InstructionParser} from "../InstructionParser";

export class BindInstructionParser implements InstructionParser{
    // 绑定的属性
    attr: string | undefined

    parse(mvvm: any, node: any, expr: string): void {
        let data = getData(mvvm, expr) // 属性值
        // 给node设置该属性的值
        node.setAttribute(this.attr, data)

        // 注册监听
        new MyWatcher(mvvm, expr, (newValue: any, oldValue: any)=> {
            node.setAttribute(this.attr, newValue)
        })

    }

}