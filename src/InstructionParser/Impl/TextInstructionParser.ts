import {getData} from "../../util";
import {MyWatcher} from "../../MyWatcher";
import {InstructionParser} from "../InstructionParser";

export class TextInstructionParser implements InstructionParser{
    parse(mvvm: any, node: any, expr: string): void {
        node.textContent = getData(mvvm, expr)
        // 注册监听
        new MyWatcher(mvvm, expr, (newValue: any, oldValue: any) => {
            node.textContent = newValue
        })
    }
}