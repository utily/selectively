import { Expression } from "./Expression"
import { Rule } from "./Rule"

export class GreaterThanOrEqual extends Rule {
	readonly precedence = 85
	readonly class = "GreaterThanOrEqual"
	readonly symbol = ">="
	constructor(readonly value: bigint | boolean | number | string | Expression) {
		super()
	}
	is(value: any): boolean
	is(value: any, object?: any): boolean {
		return (
			(isNaN(+value) ? value : +value) >= (typeof this.value == "object" ? this.value.evaluate(object) : this.value)
		)
	}
	toString(): string {
		return this.value.toString()
	}
}
export function greaterThanOrEqual(criteria: bigint | boolean | number | string): GreaterThanOrEqual
export function greaterThanOrEqual(criteria: bigint | boolean | number | string, value?: any): boolean
export function greaterThanOrEqual(
	criteria: bigint | boolean | number | string,
	value?: any
): GreaterThanOrEqual | boolean {
	const result = new GreaterThanOrEqual(criteria)
	return value ? result.is(value) : result
}
