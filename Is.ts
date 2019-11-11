import { Base } from "./Base"
import { Criteria } from "./Criteria"

export class Is extends Base {
	constructor(readonly value: any) {
		super()
	}
	is(value: any): boolean {
		return is(this.value, value)
	}
}
export function is(criteria: Criteria, value: any): boolean {
	const type = typeof(criteria)
	return criteria instanceof Base ? criteria.is(value) : type == typeof(value) && (
		(type == "bigint" || type == "boolean" || type == "number" || type == "string") ? criteria === value :
		Array.isArray(criteria) ? Array.isArray(value) && criteria.length == value.length && criteria.every((element, index) => is(element, value[index])) :
		typeof(criteria) == "object" ? Object.getOwnPropertyNames(criteria).every(property => is(criteria[property], value[property])) :
		false
	)
}
export function filter<T>(criteria: Criteria, value: T[]): T[] {
	return value.filter(element => is(criteria, element))
}
