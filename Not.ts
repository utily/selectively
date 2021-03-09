import { Criteria } from "./Criteria"
import { create, Rule } from "./Rule"
import { Type } from "./Type"

export class Not extends Rule {
	readonly precedence = Not.precedence
	readonly class = "Not"
	constructor(readonly criteria: Rule) {
		super()
	}
	is(value: any): boolean {
		return !this.criteria.is(value)
	}
	toString(): string {
		return `!${this.criteria.stringify(this.precedence)}`
	}
	static readonly precedence = 90
}
export function not(criteria: Criteria): Not
export function not(criteria: Criteria, value: any): boolean
export function not(criteria: Criteria, value?: any): Not | boolean {
	const result = new Not(create(criteria))
	return value ? result.is(value) : result
}

Type.Number.add({ value: "!" })
Type.Boolean.add({ value: "!" })
