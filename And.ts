import { Base } from "./Base"
import { Criteria } from "./Criteria"
import { Is } from "./Is"

export class And extends Base {
	constructor(readonly criterias: Base[]) {
		super()
	}
	is(value: any): boolean {
		return this.criterias.every(c => c.is(value))
	}
}
export function and(...criterias: Criteria[]): And {
	return new And(criterias.map(c => c instanceof Base ? c : new Is(c)))
}
