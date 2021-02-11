import { CompareHelper } from "./CompareHelper"
import { Rule } from "./Rule"

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
		return Array.isArray(this.value) ? `${this.value[0]}<${this.value[1]}` : `<${this.value}`
	}
}
export function lesserThan(criteria: CompareHelper): LesserThan
export function lesserThan(criteria: CompareHelper, value: any): boolean
export function lesserThan(criteria: CompareHelper, value?: any): LesserThan | boolean {
	const result = new LesserThan(criteria)
	return value ? result.is(value) : result
}
