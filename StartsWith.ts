import { Token } from "./lexer"
import { Rule } from "./Rule"
import { Type } from "./Type"
import { Completion } from "./Type/Completion"

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

Type.String.add({ complete })

function complete(tokens: Token[], string: Type.String): Completion[] {
	let result: Completion[]
	const completion: Completion[] = [{ value: "*", cursor: 0 }]
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
				result = [Completion.prepend(":", { value: string.value, cursor: string.value.length }, "*")]
			else
				result = []
			break
		case 3:
			if (tokens[0].value == ":" && tokens[2].value == "*")
				result = string.completion.value?.startsWith(tokens[1].value)
					? [Completion.prepend(":", { value: string.value, cursor: string.value.length }, "*")]
					: []
			else
				result = []
			break
		default:
			result = []
	}
	return result
}
