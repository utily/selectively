import { Rule } from "./Rule"

export class LesserThan extends Rule {
	readonly precedence = Number.MAX_SAFE_INTEGER
	readonly class = "LesserThan"
	constructor(readonly value: number | string) {
		super()
	}
	is(value: any): boolean {
		return typeof value == "number" && typeof this.value == "string"
			? value < Number.parseFloat(this.value)
			: typeof value == "number" && typeof this.value == "number"
			? value < this.value
			: value.toString().trim() < this.value.toString().trim()
	}
	toString() {
		return `<${this.value}`
	}
}
export function lesserThan(criteria: number | string): LesserThan
export function lesserThan(criteria: number | string, value: any): boolean
export function lesserThan(criteria: number | string, value?: any): LesserThan | boolean {
	const result = new LesserThan(criteria)
	return value ? result.is(value) : result
}
