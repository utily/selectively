import { Rule } from "./Rule"

export class LesserThan extends Rule {
	readonly precedence = 70
	readonly class = "LesserThan"
	constructor(readonly value: bigint | boolean | number | string) {
		super()
	}
	is(value: any): boolean {
		return value < this.value
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
