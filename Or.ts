import { Rule, create } from "./Rule"
import { Criteria } from "./Criteria"

export class Or extends Rule {
	readonly precedence = 30
	constructor(readonly criterias: Rule[]) {
		super()
	}
	is(value: any): boolean {
		return this.criterias.some(c => c.is(value))
	}
	toString() {
		return this.criterias.map(c => c.stringify(this.precedence)).join(" | ")
	}
}
export function or(...criterias: Criteria[]): Or {
	return new Or(criterias.map(create))
}
