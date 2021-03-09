import { Criteria } from "./Criteria"
import { Token } from "./lexer"
import { create, Rule } from "./Rule"
import { Type } from "./Type"
import { Completion } from "./Type/Completion"

export class Every extends Rule {
	readonly precedence = Number.MAX_SAFE_INTEGER
	readonly class = "Every"
	constructor(readonly criteria: Rule) {
		super()
	}
	is(value: any): boolean {
		return Array.isArray(value) && value.every(v => this.criteria.is(v))
	}
	toString() {
		return `every(${this.criteria.toString()})`
	}
}
export function every(criteria: Criteria): Every
export function every(criteria: Criteria, value: any): boolean
export function every(criteria: Criteria, value?: any): Every | boolean {
	const result = new Every(create(criteria))
	return value ? result.is(value) : result
}

Type.Array.add({ complete })

function complete(tokens: Token[], array: Type.Array): Completion[] | Completion {
	let result: Completion[] | Completion
	const completion: Completion = { value: "every()", cursor: 6 }
	switch (tokens.length) {
		case 0:
			result = { value: "." }
			break
		case 1:
			if (tokens[0].value == ".")
				result = [Completion.prepend(".", completion)]
			else
				result = []
			break
		case 2:
			if (tokens[0].value == "." && completion.value?.startsWith(tokens[1].value))
				result = Completion.prepend(".", completion)
			else
				result = []
			break
		case 3:
			if (tokens[0].value == "." && tokens[1].value == "every" && tokens[2].value == "(")
				result = Completion.prepend(".", completion)
			else
				result = []
			break
		case 4:
			if (tokens[0].value == "." && tokens[1].value == "every" && tokens[2].value == "(")
				if (tokens[3].value == ")")
					//TODO function completions
					result = Completion.prepend("." + "every(", { value: "TODO", cursor: 4 }, ")")
				else
					result = []
			else
				result = []
			break
		case 5:
			if (tokens[0].value == "." && tokens[1].value == "every" && tokens[2].value == "(" && tokens[4].value == ")")
				//TODO function completions
				result = Completion.prepend("." + "every(", { value: "TODO", cursor: 4 }, ")")
			else
				result = []
			break
		default:
			result = []
			break
	}
	return result
}
