import { CompareHelper } from "./CompareHelper"
import { Token } from "./lexer"
import { Rule } from "./Rule"
import { Type } from "./Type"
import { Completor } from "./Type/Completor"

export class LesserThan extends Rule {
	readonly precedence = 70
	readonly class = "LesserThan"
	constructor(readonly value: CompareHelper) {
		super()
	}
	is(value: any): boolean {
		let result: boolean
		value = CompareHelper.adjustInput(this.value, value)
		if (typeof this.value == "string" || typeof this.value == "number")
			result =
				typeof value == "number" && typeof this.value == "string"
					? value < Number.parseFloat(this.value)
					: typeof value == "number" && typeof this.value == "number"
					? value < this.value
					: value.toString().trim() < this.value.toString().trim()
		else if (
			typeof this.value[0] == "object" &&
			typeof this.value[1] == "object" &&
			Array.isArray(value) &&
			value.length == 2
		)
			result = lesserThan(value[1], value[0])
		else
			result = lesserThan(
				typeof this.value[1] == "object" ? value : this.value[1],
				typeof this.value[0] == "object" ? value : this.value[0]
			)
		return result
	}
	toString() {
		return CompareHelper.toString(this.value, "<")
	}
}
export function lesserThan(criteria: CompareHelper): LesserThan
export function lesserThan(criteria: CompareHelper, value: any): boolean
export function lesserThan(criteria: CompareHelper, value?: any): LesserThan | boolean {
	const result = new LesserThan(criteria)
	return value ? result.is(value) : result
}

function complete(tokens: Token[], type: Type.String | Type.Number): Type.Completion[] | Type.Completion {
	return Completor.operators(
		tokens,
		(tokens?: Token[]) =>
			tokens
				? [
						/*{ value: "TODO: implement argument completions" }*/
				  ]
				: [],
		{
			value: "<",
		}
	)
}

Type.Number.add(complete)
Type.String.add(complete)
