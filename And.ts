import { Rule, create } from "./Rule"
import { Criteria } from "./Criteria"

export class And extends Rule {
	readonly precedence = 40
	constructor(readonly rules: Rule[]) {
		super()
	}
	is(value: any): boolean {
		return this.rules.every(c => c.is(value))
	}
	toString() {
		return this.rules.map(c => c.stringify(this.precedence)).join(" ")
	}
}
export function and(...criterias: Criteria[]): And {
	return new And(criterias.map(create))
}
