import { Base, create } from "./Base"
import { Criteria } from "./Criteria"

export class Some extends Base {
	readonly precedence = Number.MAX_SAFE_INTEGER
	constructor(readonly criteria: Base) {
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
