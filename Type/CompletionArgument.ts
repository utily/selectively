import { Token } from "../lexer"
import { Completion } from "./Completion"
import { TObject } from "./Object"
export interface CompletionArgument extends Completion {
	complete(tokens: Token[], object: TObject): Completion[]
}

// export namespace CompletionArgument {}
