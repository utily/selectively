import { CompareHelper } from "./CompareHelper"
import { Token } from "./lexer"
import { Rule } from "./Rule"
import { Type } from "./Type"
import { Completion } from "./Type/Completion"

export class LesserThanOrEqual extends Rule {
	readonly precedence = 70
	readonly class = "LesserThanOrEqual"
	constructor(readonly value: CompareHelper) {
		super()
	}
	is(value: any): boolean {
		let result: boolean
		value = CompareHelper.adjustInput(this.value, value)
		if (typeof this.value == "string" || typeof this.value == "number")
			result =
				typeof value == "number" && typeof this.value == "string"
					? value <= Number.parseFloat(this.value)
					: typeof value == "number" && typeof this.value == "number"
					? value <= this.value
					: value.toString().trim() <= this.value.toString().trim()
		else if (
			typeof this.value[0] == "object" &&
			typeof this.value[1] == "object" &&
			Array.isArray(value) &&
			value.length == 2
		)
			result = lesserThanOrEqual(value[1], value[0])
		else
			result = lesserThanOrEqual(
				typeof this.value[1] == "object" ? value : this.value[1],
				typeof this.value[0] == "object" ? value : this.value[0]
			)
		return result
	}
	toString() {
		return CompareHelper.toString(this.value, "<=")
	}
}
export function lesserThanOrEqual(criteria: CompareHelper): LesserThanOrEqual
export function lesserThanOrEqual(criteria: CompareHelper, value: any): boolean
export function lesserThanOrEqual(criteria: CompareHelper, value?: any): LesserThanOrEqual | boolean {
	const result = new LesserThanOrEqual(criteria)
	return value ? result.is(value) : result
}

Type.Number.add({ value: "<=" })
Type.String.add({ complete })

function complete(tokens: Token[], string: Type.String): Completion[] | Completion {
	let result: Completion[] | Completion
	const completion: Completion = { value: "<=" }
	switch (tokens.length) {
		case 0:
			result = completion
			break
		case 1:
			if (tokens[0].value == "<")
				result = completion
			else if (tokens[0].value == completion.value)
				//TODO implement completions to the function.
				result = { value: completion.value + "TODO" }
			else
				result = []
			break
		case 2:
			if (tokens[0].value == completion.value)
				//TODO implement completions to the function.
				result = { value: completion.value + "TODO" }
			else
				result = []
			break
		default:
			result = []
			break
	}
	return result
}
