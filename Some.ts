import { Base } from "./Base"
import { Criteria } from "./Criteria"
import { Is } from "./Is"

export class Some extends Base {
	constructor(readonly criteria: Base) {
		super()
	}
	is(value: any): boolean {
		return Array.isArray(value) && value.some(v => this.criteria.is(v))
	}
}
export function some(criteria: Criteria): Some
export function some(criteria: Criteria, value: any): boolean
export function some(criteria: Criteria, value?: any): Some | boolean {
	const result = new Some(criteria instanceof Base ? criteria : new Is(criteria))
	return value ? result.is(value) : result
}
