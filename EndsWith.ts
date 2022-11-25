import { Leaf } from "./Leaf"
import { Token } from "./lexer"
import { Type } from "./Type"
import { Completor } from "./Type/Completor"

export class EndsWith extends Leaf {
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

function complete(tokens: Token[], string: Type.String): Type.Completion[] | Type.Completion {
	return Completor.expressions(
		tokens,
		(tokens?: Token[]) => {
			return !tokens || (tokens[0].value == "*" && string.value && string.value.endsWith(tokens[1]?.value ?? ""))
				? [Type.Completion.prepend("*", { value: string?.value ?? "", suggestion: { value: string?.value ?? "" } })]
				: []
		},
		{ value: "*", suggestion: { value: "*", description: "endswith" } }
	)
}

Type.String.add(complete)
