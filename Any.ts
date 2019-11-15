import { Base, create } from "./Base"
import { Criteria } from "./Criteria"

export class Any extends Base {
	readonly precedence = 50
	constructor(readonly criteria: Base) {
		super()
	}
	is(value: any): boolean {
		return typeof(value) == "object" && Object.getOwnPropertyNames(value).some(property => this.criteria.is(value[property]) || this.is(value[property]))
	}
	toString() {
		return this.criteria.stringify(this.precedence)
	}
}
export function any<T>(criteria: Criteria): Base
export function any<T>(criteria: Criteria, value: any): boolean
export function any<T>(criteria: Criteria, value?: any): Base | boolean {
	const result = new Any(create(criteria))
	return value ? result.is(value) : result
}
