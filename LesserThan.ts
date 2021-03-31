import { BinaryOperator } from "./BinaryOperator"
import { Rule } from "./Rule"

export class LesserThan extends Rule {
	readonly precedence = 85
	readonly class = "LesserThan"
	readonly symbol = "<"
	constructor(readonly value: bigint | boolean | number | string | BinaryOperator) {
		super()
	}
	is(value: any): boolean
	is(value: any, object?: any): boolean {
		return (isNaN(+value) ? value : +value) < (typeof this.value == "object" ? this.value.evaluate(object) : this.value)
	}
	toString(): string {
		return this.value.toString()
	}
}
export function lesserThan(criteria: bigint | boolean | number | string): LesserThan
export function lesserThan(criteria: bigint | boolean | number | string, value?: any): boolean
export function lesserThan(criteria: bigint | boolean | number | string, value?: any): LesserThan | boolean {
	const result = new LesserThan(criteria)
	return value ? result.is(value) : result
}
