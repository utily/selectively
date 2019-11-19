import { Rule, create } from "./Rule"
import { Criteria } from "./Criteria"

export class And extends Rule {
	readonly precedence = 40
	constructor(readonly criterias: Rule[]) {
		super()
	}
	is(value: any): boolean {
		return this.criterias.every(c => c.is(value))
	}
	toString() {
		return this.criterias.map(c => c.stringify(this.precedence)).join(" ")
	}
}
export function and(...criterias: Criteria[]): And {
	return new And(criterias.map(create))
}
