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
export function not(criteria: Criteria): Not {
	return new Not(criteria instanceof Base ? criteria : new Is(criteria))
}
