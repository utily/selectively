import { CompareHelper } from "./CompareHelper"
import { Rule } from "./Rule"
import { Type } from "./Type"

export class GreaterThanOrEqual extends Rule {
	readonly precedence = 70
	readonly class = "GreaterThan"
	constructor(readonly value: CompareHelper) {
		super()
	}
	is(value: any): boolean {
		let result: boolean
		value = CompareHelper.adjustInput(this.value, value)
		if (typeof this.value == "string" || typeof this.value == "number")
			result =
				typeof value == "number" && typeof this.value == "string"
					? value >= Number.parseFloat(this.value)
					: typeof value == "number" && typeof this.value == "number"
					? value >= this.value
					: value.toString().trim() >= this.value.toString().trim()
		else if (
			typeof this.value[0] == "object" &&
			typeof this.value[1] == "object" &&
			Array.isArray(value) &&
			value.length == 2
		)
			result = greaterThanOrEqual(value[1], value[0])
		else
			result = greaterThanOrEqual(
				typeof this.value[1] == "object" ? value : this.value[1],
				typeof this.value[0] == "object" ? value : this.value[0]
			)
		return result
	}
	toString() {
		return CompareHelper.toString(this.value, ">=")
	}
}
export function greaterThanOrEqual(criteria: CompareHelper): GreaterThanOrEqual
export function greaterThanOrEqual(criteria: CompareHelper, value: any): boolean
export function greaterThanOrEqual(criteria: CompareHelper, value?: any): GreaterThanOrEqual | boolean {
	const result = new GreaterThanOrEqual(criteria)
	return value ? result.is(value) : result
}

Type.Number.add({ value: ">=" })
