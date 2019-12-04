import { Rule, create } from "./Rule"
import { Criteria } from "./Criteria"

export class Or extends Rule {
	readonly precedence = Or.precedence
	readonly class = "Or"
	readonly criteria: Rule[]
	constructor(criterias: Rule[]) {
		super()
		this.criteria = criterias.reduce<Rule[]>((r, c) => c instanceof Or ? [...r, ...c.criteria] : [...r, c], []) // flatten
	}
	is(value: any): boolean {
		return this.criteria.some(c => c.is(value))
	}
	toString() {
		return this.criteria.map(c => c.stringify(this.precedence)).join(" | ")
	}
	static readonly precedence = 30
}
export function or(...criterias: Criteria[]): Or {
	return new Or(criterias.map(create))
}
