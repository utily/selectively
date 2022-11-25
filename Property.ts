import { and } from "./And"
import { Criteria } from "./Criteria"
import { add, create, Rule } from "./Rule"

export class Property extends Rule {
	readonly precedence = Property.precedence
	readonly class = "Property"
	readonly symbol = "."
	constructor(readonly name: string, readonly criteria: Rule) {
		super()
	}

	is(value: any): boolean
	is(value: any, object?: any): boolean {
		return typeof value == "object" && this.criteria.is(value[this.name], object ?? value)
	}
	get([head, ...tail]: string[]): Rule | undefined {
		return head == this.name ? this.criteria.get(tail) : undefined
	}
	toString(): string {
		return `${this.name}${this.criteria.symbol ?? ":"}${this.criteria.stringify(this.precedence)}`
	}
	static readonly precedence = 80
}
export function property(name: string | string[], criteria: Criteria): Property
export function property(name: string | string[], criteria: Criteria, value: any): boolean
export function property(name: string | string[], criteria: Criteria, value?: any): Property | boolean {
	const result = (Array.isArray(name) ? name : [name]).reduceRight((r, p) => new Property(p, r), create(criteria))
	return value ? result.is(value) : (result as Property)
}
add(criteria =>
	typeof criteria == "object" && !(criteria instanceof Rule) && !Array.isArray(criteria)
		? and(...Object.getOwnPropertyNames(criteria).map(p => property(p, criteria[p])))
		: undefined
)
