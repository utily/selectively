import { Any } from "./Any"
import { Criteria } from "./Criteria"
import { create, Rule } from "./Rule"

export class And extends Rule {
	readonly precedence = 40
	readonly class = "And"
	readonly rules: Rule[]
	constructor(rules: Rule[]) {
		super()
		this.rules = rules.reduce<Rule[]>((r, e) => (e instanceof And ? [...r, ...e.rules] : [...r, e]), [])
	}
	is(value: any): boolean {
		return this.rules.every(c => c.is(value))
	}
	get(path: string[]): Rule | undefined {
		return this.rules.reduce((result, rule) => result ?? rule.get(path), undefined)
	}
	toString() {
		return this.rules.map(c => c.stringify(this.precedence)).join(" ")
	}
	generalize(): And {
		return new And(this.rules.map(r => (r.class == "Property" ? r : new Any(r))))
	}
}
export function and(...criterias: Criteria[]): And {
	return new And(criterias.map(create))
}
