import { Criteria } from "./Criteria"
import { create, Rule } from "./Rule"

export class Any extends Rule {
	readonly precedence = 50
	readonly class = "Any"
	constructor(readonly criteria: Rule) {
		super()
	}
	is(value: any): boolean {
		return (
			value &&
			typeof value == "object" &&
			Object.getOwnPropertyNames(value).some(property => this.criteria.is(value[property]) || this.is(value[property]))
		)
	}
	toString() {
		return this.criteria.stringify(this.precedence)
	}
}
export function any<T>(criteria: Criteria): Rule
export function any<T>(criteria: Criteria, value: any): boolean
export function any<T>(criteria: Criteria, value?: any): Rule | boolean {
	const result = new Any(create(criteria))
	return value ? result.is(value) : result
}
