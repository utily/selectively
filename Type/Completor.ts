import { Token } from "../lexer"
import { Base } from "./Base"
import { Completion } from "./Completion"

export type Completor<T extends Base> = (tokens: Token[], data: T) => Completion[] | Completion

//class: "function" | "operator" | "expression"
//           "."          ""           ":"

export namespace Completor {
	export function functions(
		tokens: Token[],
		completor: (token?: Token) => Completion[],
		completion: Completion
	): Completion[] | Completion {
		return tokens.length == 0
			? { value: "." }
			: tokens.length <= 3 &&
			  tokens[0].value == "." &&
			  completion.value.startsWith(tokens[1]?.value ?? "") &&
			  (tokens[2]?.value ?? "(") == "("
			? Completion.prepend(".", completion)
			: tokens.length <= 4 &&
			  tokens.slice(0, 4).reduce((string, token) => string + token.value, "") == "." + completion.value
			? Completion.prepend("." + completion.value.substring(0, completion.value.length - 1), completor(), ")")
			: tokens.length == 5 &&
			  tokens.slice(0, 3).reduce((string, token) => string + token.value, "") + tokens[4].value ==
					"." + completion.value
			? Completion.prepend("." + completion.value.substring(0, completion.value.length - 1), completor(tokens[3]), ")")
			: []
	}

	export function expressions(
		tokens: Token[],
		completor: (tokens?: Token[]) => Completion[],
		completion: Completion
	): Completion[] | Completion {
		return tokens.length == 0
			? { value: ":" }
			: tokens[0].value != ":"
			? []
			: tokens.length == 1
			? Completion.prepend(":", completion)
			: Completion.prepend(":", completor(tokens.slice(1)))
	}
}
//Måste lösa expressionComplete, endswith, startswith och includes.

// ":**" = [":", "*", "*"]
