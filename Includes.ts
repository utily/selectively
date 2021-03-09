import { Token } from "./lexer"
import { Rule } from "./Rule"
import { Type } from "./Type"
import { Completion } from "./Type/Completion"

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

Type.String.add({ value: "**", cursor: 1, complete })

function complete(tokens: Token[], string: Type.String): Completion[] {
	let result: Completion[]
	const completion: Completion[] = [{ value: "**", cursor: 1 }]
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
				result = Completion.prepend(":", completion)
			else
				result = []
			break
		case 3:
			if (tokens[0].value == ":" && tokens[1].value == "*" && tokens[2].value == "*")
				result = [Completion.prepend(":" + "*", { value: string.value }, "*")]
			else
				result = []
			break
		case 4:
			if (tokens[0].value == ":" && tokens[1].value == "*" && tokens[3].value == "*") {
				result = string.completion.value.includes(tokens[2].value)
					? [Completion.prepend(":" + "*", { value: string.value }, "*")]
					: []
			} else
				result = []
			break
		default:
			result = []
	}
	return result
}
