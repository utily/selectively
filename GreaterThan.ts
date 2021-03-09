import { CompareHelper } from "./CompareHelper"
import { Token } from "./lexer"
import { Rule } from "./Rule"
import { Type } from "./Type"
import { Completion } from "./Type/Completion"

export class GreaterThan extends Rule {
	readonly precedence = 70
	readonly class = "GreaterThan"
	constructor(readonly value: CompareHelper) {
		super()
	}
	is(value: any): boolean {
		let result: boolean | undefined
		value = CompareHelper.adjustInput(this.value, value)
		if (typeof this.value == "string" || typeof this.value == "number")
			result =
				value == undefined
					? false
					: typeof value == "number" && typeof this.value == "string"
					? value > Number.parseFloat(this.value)
					: typeof value == "number" && typeof this.value == "number"
					? value > this.value
					: value.toString().trim() > this.value.toString().trim()
		else if (
			typeof this.value[0] == "object" &&
			typeof this.value[1] == "object" &&
			Array.isArray(value) &&
			value.length == 2
		)
			result = greaterThan(value[1], value[0])
		else
			result = greaterThan(
				typeof this.value[1] == "object" ? value : this.value[1],
				typeof this.value[0] == "object" ? value : this.value[0]
			)
		return result
	}
	toString() {
		return CompareHelper.toString(this.value, ">")
	}
}

export function greaterThan(criteria: CompareHelper): GreaterThan
export function greaterThan(criteria: CompareHelper, value: any): boolean
export function greaterThan(criteria: CompareHelper, value?: any): GreaterThan | boolean {
	const result = new GreaterThan(criteria)
	return value ? result.is(value) : result
}

Type.Number.add({ value: ">" })
Type.String.add({ complete })

function complete(tokens: Token[], string: Type.String): Completion[] | Completion {
	let result
	const completion: Completion = { value: ">" }
	switch (tokens.length) {
		case 0:
			result = completion
			break
		case 1:
			if (tokens[0].value == completion.value)
				//TODO implement completions to the function.
				result = { value: completion.value + "TODO" }
			else
				result = []
			break
		case 2:
			//TODO implement completions to the function.
			result = []
			break
		default:
			result = []
			break
	}
	return result
}
