import {InstructionParser} from "../InstructionParser";

export class OnInstructionParser implements InstructionParser{
    // 绑定的事件类型
    eventType: string | undefined

    parse(mvvm: any, node: any, expr: string): void {
        // 给节点添加事件监听器 并且要修改func方法中的this指向，bind到mvvm上
        let func = mvvm.$methods && mvvm.$methods[expr]
        node.addEventListener(this.eventType,func.bind(mvvm))
    }
}
