import { Rule } from "./Rule"

export class GreaterThanOrEqual extends Rule {
	readonly precedence = Number.MAX_SAFE_INTEGER
	readonly class = "GreaterThan"
	constructor(readonly value: number | string) {
		super()
	}
	is(value: any): boolean {
		return typeof value == "number" && typeof this.value == "string"
			? value >= Number.parseFloat(this.value)
			: typeof value == "number" && typeof this.value == "number"
			? value >= this.value
			: value.toString().trim() >= this.value.toString().trim()
	}
	toString() {
		return `>=${this.value}`
	}
}
export function greaterThanOrEqual(criteria: number | string): GreaterThanOrEqual
export function greaterThanOrEqual(criteria: number | string, value: any): boolean
export function greaterThanOrEqual(criteria: number | string, value?: any): GreaterThanOrEqual | boolean {
	const result = new GreaterThanOrEqual(criteria)
	return value ? result.is(value) : result
}
