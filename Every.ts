import { Base } from "./Base"
import { Criteria } from "./Criteria"
import { Is } from "./Is"

export class Every extends Base {
	constructor(readonly criteria: Base) {
		super()
	}
	is(value: any): boolean {
		return Array.isArray(value) && value.every(v => this.criteria.is(v))
	}
}
export function every(criteria: Criteria): Every
export function every(criteria: Criteria, value: any): boolean
export function every(criteria: Criteria, value?: any): Every | boolean {
	const result = new Every(criteria instanceof Base ? criteria : new Is(criteria))
	return value ? result.is(value) : result
}
