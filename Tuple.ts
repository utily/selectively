import { Base, create, add } from "./Base"

export class Tuple extends Base {
	readonly precedence = Number.MAX_SAFE_INTEGER
	constructor(readonly criteria: Base[]) {
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
