import { BinaryOperator } from "./BinaryOperator"
import { Rule } from "./Rule"

export class GreaterThanOrEqual extends Rule {
	readonly precedence = 85
	readonly class = "GreaterThanOrEqual"
	readonly symbol = ">="
	constructor(readonly value: bigint | boolean | number | string | BinaryOperator) {
		super()
	}
	is(value: any): boolean {
		return (isNaN(+value) ? value : +value) >= this.value
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
