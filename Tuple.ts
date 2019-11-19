import { Rule, create, add } from "./Rule"

export class Tuple extends Rule {
	readonly precedence = Number.MAX_SAFE_INTEGER
	constructor(readonly criteria: Rule[]) {
		super()
	}
	is(value: any): boolean {
		return this.criteria.length == value.length && this.criteria.every((c, index) => c.is(value[index]))
	}
	toString() {
		return `[${ this.criteria.map(c => c.toString()).join(", ") }]`
	}
}
add(criteria => Array.isArray(criteria) ? new Tuple(criteria.map(create)) : undefined)
