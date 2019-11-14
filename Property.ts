import { Base, add, create } from "./Base"
import { Criteria } from "./Criteria"
import { and } from "./And"

export class Property extends Base {
	readonly precedence = 80
	constructor(readonly name: string, readonly criteria: Base) {
		super()
	}
	is(value: any): boolean {
		return typeof(value) == "object" && this.criteria.is(value[this.name])
	}
	toString(): string {
		return `${ this.name }:${ this.criteria.stringify(this.precedence) }`
	}
}
export function property(name: string, criteria: Criteria): Property
export function property(name: string, criteria: Criteria, value: any): boolean
export function property(name: string, criteria: Criteria, value?: any): Property | boolean {
	const result = new Property(name, create(criteria))
	return value ? result.is(value) : result
}
add(criteria => typeof(criteria) == "object" && !(criteria instanceof Base) && !Array.isArray(criteria) ? and(...Object.getOwnPropertyNames(criteria).map(p => property(p, criteria[p]))) : undefined)
