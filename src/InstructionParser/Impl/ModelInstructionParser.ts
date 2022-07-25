import {getData, setData} from "../../util";
import {MyWatcher} from "../../MyWatcher";
import {InstructionParser} from "../InstructionParser";

export class ModelInstructionParser implements InstructionParser {
    parse(mvvm: any, node: any, expr: string): void {
        node.value = getData(mvvm, expr)
        // 实现双向数据绑定
        // 给node注册input事件，当input框里的value值发生改变时，修改对应的data中的数据
        node.addEventListener('input', function () {
            // 回调函数：修改值
            setData(mvvm, expr, node.value)
        })

        // 注册监听
        new MyWatcher(mvvm, expr, (newValue: any, oldValue: any) => {
            node.value = newValue
        })
    }
}