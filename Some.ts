import { Rule, create } from "./Rule"
import { Criteria } from "./Criteria"

export class Some extends Rule {
	readonly precedence = Number.MAX_SAFE_INTEGER
	readonly class = "Some"
	constructor(readonly criteria: Rule) {
		super()
	}
	is(value: any): boolean {
		return Array.isArray(value) && value.some(v => this.criteria.is(v))
	}
	toString() {
		return `some(${ this.criteria.toString() })`
	}
}
export function some(criteria: Criteria): Some
export function some(criteria: Criteria, value: any): boolean
export function some(criteria: Criteria, value?: any): Some | boolean {
	const result = new Some(create(criteria))
	return value ? result.is(value) : result
}
