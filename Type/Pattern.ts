import { Token } from "../lexer"
import { TArray } from "./Array"
import { Completion } from "./Completion"
import { TObject } from "./Object"
import { String as TString } from "./String"

export interface Pattern extends Completion {
	complete(tokens: Token[], type?: TObject | TString | TArray): Completion[] | Completion
}
