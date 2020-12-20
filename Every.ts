import { Criteria } from "./Criteria"
import { create, Rule } from "./Rule"

export class Every extends Rule {
	readonly precedence = Number.MAX_SAFE_INTEGER
	readonly class = "Every"
	constructor(readonly criteria: Rule) {
		super()
	}
	is(value: any): boolean {
		return Array.isArray(value) && value.every(v => this.criteria.is(v))
	}
	toString() {
		return `every(${this.criteria.toString()})`
	}
}
export function every(criteria: Criteria): Every
export function every(criteria: Criteria, value: any): boolean
export function every(criteria: Criteria, value?: any): Every | boolean {
	const result = new Every(create(criteria))
	return value ? result.is(value) : result
}
