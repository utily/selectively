import { Base } from "./Base"
import { Criteria } from "./Criteria"
import { Is } from "./Is"

export class Or extends Base {
	constructor(readonly criterias: Base[]) {
		super()
	}
	is(value: any): boolean {
		return this.criterias.some(c => c.is(value))
	}
}
export function or(...criterias: Criteria[]): Or {
	return new Or(criterias.map(c => c instanceof Base ? c : new Is(c)))
}
