import { Rule } from "./Rule"

export class LesserThanOrEqual extends Rule {
	readonly precedence = 85
	readonly class = "LesserThanOrEqual"
	constructor(readonly value: bigint | boolean | number | string) {
		super()
	}
	is(value: any): boolean {
		return (isNaN(+value) ? value : +value) <= this.value
	}
	toString(): string {
		return this.value.toString()
	}
}
export function lesserThanOrEqual(criteria: bigint | boolean | number | string): LesserThanOrEqual
export function lesserThanOrEqual(criteria: bigint | boolean | number | string, value?: any): boolean
export function lesserThanOrEqual(
	criteria: bigint | boolean | number | string,
	value?: any
): LesserThanOrEqual | boolean {
	const result = new LesserThanOrEqual(criteria)
	return value ? result.is(value) : result
}
