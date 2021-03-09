import { Token } from "./lexer"
import { Rule } from "./Rule"
import { Type } from "./Type"
import { Completion } from "./Type/Completion"

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

Type.String.add({ value: "*", complete })

function complete(tokens: Token[], string: Type.String): Completion[] {
	let result: Completion[]
	const completion: Completion[] = [{ value: "*" }]
	switch (tokens.length) {
		case 0:
			result = [{ value: ":" }]
			break
		case 1:
			if (tokens[0].value == ":")
				result = Completion.prepend(":", completion)
			else
				result = []
			break
		case 2:
			if (tokens[0].value == ":" && tokens[1].value == "*")
				result = [Completion.prepend(":" + "*", { value: string.value })]
			else
				result = []
			break
		case 3:
			if (tokens[0].value == ":" && tokens[1].value == "*")
				result = string.completion.value.endsWith(tokens[2].value)
					? [Completion.prepend(":" + "*", { value: string.value })]
					: []
			else
				result = []
			break
		default:
			result = []
	}
	return result
}
