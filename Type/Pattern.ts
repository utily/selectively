import { Token } from "../lexer"
import { Completion } from "./Completion"
import { TObject } from "./Object"
import { String as TString } from "./String"

export interface Pattern extends Completion {
	complete(tokens: Token[], object?: TObject | TString): Completion[] | (Completion | undefined)
}
