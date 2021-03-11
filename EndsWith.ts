import { Token } from "./lexer"
import { Rule } from "./Rule"
import { Type } from "./Type"
import { Completion } from "./Type/Completion"
import { Completor } from "./Type/Completor"

export class EndsWith extends Rule {
	readonly precedence = Number.MAX_SAFE_INTEGER
	readonly class = "EndsWith"
	constructor(readonly needle: string) {
		super()
	}
	is(value: any): boolean {
		return typeof value == "string" && value.endsWith(this.needle)
	}
	toString() {
		return `*${this.needle}`
	}
}
export function endsWith(needle: string): EndsWith
export function endsWith(needle: string, value: any): boolean
export function endsWith(needle: string, value?: any): EndsWith | boolean {
	const result = new EndsWith(needle)
	return value ? result.is(value) : result
}

function complete(tokens: Token[], string: Type.String): Completion[] | Completion {
	return Completor.expressions(
		tokens,
		(tokens?: Token[]) => {
			return !tokens || string.completion.value.endsWith(tokens[1]?.value ?? "")
				? [Completion.prepend("*", { value: string.value })]
				: []
		},
		{ value: "*", cursor: 1 }
	)
}

Type.String.add(complete)
