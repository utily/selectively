import { Expression } from "./Expression"
import { Rule } from "./Rule"

export class GreaterThan extends Rule {
	readonly precedence = 85
	readonly class = "GreaterThan"
	readonly symbol = ">"
	constructor(readonly value: bigint | boolean | number | string | Expression) {
		super()
	}
	is(value: any): boolean
	is(value: any, object?: any): boolean {
		return (isNaN(+value) ? value : +value) > (typeof this.value == "object" ? this.value.evaluate(object) : this.value)
	}
	toString(): string {
		return this.value.toString()
	}
}
export function greaterThan(criteria: bigint | boolean | number | string): GreaterThan
export function greaterThan(criteria: bigint | boolean | number | string, value?: any): boolean
export function greaterThan(criteria: bigint | boolean | number | string, value?: any): GreaterThan | boolean {
	const result = new GreaterThan(criteria)
	return value ? result.is(value) : result
}
