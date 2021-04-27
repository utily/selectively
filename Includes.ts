import { Token } from "./lexer"
import { Rule } from "./Rule"
import { Type } from "./Type"
import { Completor } from "./Type/Completor"

export class Includes extends Rule {
	readonly precedence = Number.MAX_SAFE_INTEGER
	readonly class = "Includes"
	constructor(readonly needle: string) {
		super()
	}
	is(value: any): boolean {
		return typeof value == "string" && value.includes(this.needle)
	}
	toString() {
		return `*${this.needle}*`
	}
}
export function includes(needle: string): Includes
export function includes(needle: string, value: any): boolean
export function includes(needle: string, value?: any): Includes | boolean {
	const result = new Includes(needle)
	return value ? result.is(value) : result
}

function complete(tokens: Token[], string: Type.String): Type.Completion[] | Type.Completion {
	return Completor.expressions(
		tokens,
		(tokens?: Token[]) => {
			return !tokens ||
				(tokens.length == 3 && string.value?.includes(tokens[1].value)) ||
				(tokens.length == 2 && tokens[0].value + tokens[1].value == "**")
				? [Type.Completion.prepend("*", { value: string?.value ?? "" }, "*")]
				: tokens.length == 1 && tokens[0].value == "*"
				? [{ value: "**" }]
				: []
		},
		{ value: "**", cursor: 1 }
	)
}

Type.String.add(complete)
