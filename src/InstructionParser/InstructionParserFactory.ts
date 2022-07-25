import {TextInstructionParser} from "./Impl/TextInstructionParser";
import {InstructionParser} from "./InstructionParser";
import {HtmlInstructionParser} from "./Impl/HtmlInstructionParser";
import {ModelInstructionParser} from "./Impl/ModelInstructionParser";
import {OnInstructionParser} from "./Impl/OnInstructionParser";
import {BindInstructionParser} from "./Impl/BindInstructionParser";

// 指令解析器工厂
export class InstructionParserFactory{

    /**
     * 根据type创建对应的指令解析器
     * @param type
     */
    static createParser(type: string): InstructionParser|undefined {
        switch (type){
            case 'text':
                return new TextInstructionParser();
            case 'html':
                return new HtmlInstructionParser();
            case 'model':
                return new ModelInstructionParser();
            case 'on':
                return new OnInstructionParser();
            case 'bind':
                return new BindInstructionParser();
        }
    }
}