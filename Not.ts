import { Base } from "./Base"
import { Criteria } from "./Criteria"
import { Is } from "./Is"

export class Not extends Base {
	constructor(readonly criteria: Base) {
		super()
	}
	is(value: any): boolean {
		return !this.criteria.is(value)
	}
}
export function not(criteria: Criteria): Not
export function not(criteria: Criteria, value: any): boolean
export function not(criteria: Criteria, value?: any): Not | boolean {
	const result = new Not(criteria instanceof Base ? criteria : new Is(criteria))
	return value ? result.is(value) : result
}
