import { Rule } from "./Rule"

export class GreaterThan extends Rule {
	readonly precedence = Number.MAX_SAFE_INTEGER
	readonly class = "GreaterThan"
	constructor(readonly value: number | string) {
		super()
	}
	is(value: any): boolean {
		return typeof value == "number" && typeof this.value == "string"
			? value > Number.parseFloat(this.value)
			: typeof value == "number" && typeof this.value == "number"
			? value > this.value
			: value.toString().trim() > this.value.toString().trim()
	}
	toString() {
		return `>${this.value}`
	}
}
export function greaterThan(criteria: number | string): GreaterThan
export function greaterThan(criteria: number | string, value: any): boolean
export function greaterThan(criteria: number | string, value?: any): GreaterThan | boolean {
	const result = new GreaterThan(criteria)
	return value ? result.is(value) : result
}
