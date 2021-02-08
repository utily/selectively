import { Rule } from "./Rule"

export class LesserThanOrEqual extends Rule {
	readonly precedence = Number.MAX_SAFE_INTEGER
	readonly class = "LesserThan"
	constructor(readonly value: number | string) {
		super()
	}
	is(value: any): boolean {
		return typeof value == "number"
			? typeof this.value == "string"
				? value <= Number.parseFloat(this.value)
				: value <= this.value
			: value.toString().trim() <= this.value.toString().trim()
	}
	toString() {
		return `<=${this.value}`
	}
}
export function lesserThanOrEqual(criteria: number | string): LesserThanOrEqual
export function lesserThanOrEqual(criteria: number | string, value: any): boolean
export function lesserThanOrEqual(criteria: number | string, value?: any): LesserThanOrEqual | boolean {
	const result = new LesserThanOrEqual(criteria)
	return value ? result.is(value) : result
}
