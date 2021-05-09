import { Token } from "./lexer"
import { Rule } from "./Rule"
import { Type } from "./Type"
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

function complete(tokens: Token[], string: Type.String): Type.Completion[] | Type.Completion {
	return Completor.expressions(
		tokens,
		(tokens?: Token[]) => {
			return !tokens ||
				(tokens.length == 1 && tokens[0].value == "*") ||
				(tokens.length == 2 &&
					tokens[1].value == "*" &&
					string.value &&
					string.value.startsWith(tokens[0]?.value ?? ""))
				? [Type.Completion.prepend("", { value: string?.value ?? "", suggestion: { value: string?.value ?? "" } }, "*")]
				: []
		},
		{ value: "*", cursor: 0, suggestion: { value: "*", description: "startswith" } }
	)
}

Type.String.add(complete)
