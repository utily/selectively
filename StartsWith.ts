import { Token } from "./lexer"
import { Rule } from "./Rule"
import { Type } from "./Type"
import { Completion } from "./Type/Completion"
import { Completor } from "./Type/Completor"

export class StartsWith extends Rule {
	readonly precedence = Number.MAX_SAFE_INTEGER
	readonly class = "StartsWith"
	constructor(readonly needle: string) {
		super()
	}
	is(value: any): boolean {
		return typeof value == "string" && value.startsWith(this.needle)
	}
	toString() {
		return `${this.needle}*`
	}
}
export function startsWith(needle: string): StartsWith
export function startsWith(needle: string, value: any): boolean
export function startsWith(needle: string, value?: any): StartsWith | boolean {
	const result = new StartsWith(needle)
	return value ? result.is(value) : result
}

function complete(tokens: Token[], string: Type.String): Completion[] | Completion {
	return Completor.expressions(
		tokens,
		(tokens?: Token[]) => {
			return !tokens || string.completion.value.startsWith(tokens[0]?.value ?? "")
				? [Completion.prepend("", { value: string.value }, "*")]
				: []
		},
		{ value: "*", cursor: 1 }
	)
}

Type.String.add(complete)
