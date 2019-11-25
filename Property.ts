import { Rule, add, create } from "./Rule"
import { Criteria } from "./Criteria"
import { and } from "./And"

export class Property extends Rule {
	readonly precedence = 80
	constructor(readonly name: string, readonly criteria: Rule) {
		super()
	}
	is(value: any): boolean {
		return typeof(value) == "object" && this.criteria.is(value[this.name])
	}
	toString(): string {
		return `${ this.name }:${ this.criteria.stringify(this.precedence) }`
	}
}
export function property(name: string | string[], criteria: Criteria): Property
export function property(name: string | string[], criteria: Criteria, value: any): boolean
export function property(name: string | string[], criteria: Criteria, value?: any): Property | boolean {
	const result = (Array.isArray(name) ? name : [name]).reduceRight((r, p) => new Property(p, r), create(criteria))
	return value ? result.is(value) : result as Property
}
add(criteria => typeof(criteria) == "object" && !(criteria instanceof Rule) && !Array.isArray(criteria) ? and(...Object.getOwnPropertyNames(criteria).map(p => property(p, criteria[p]))) : undefined)
