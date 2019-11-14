import { Base, create } from "./Base"
import { Criteria } from "./Criteria"

export class Every extends Base {
	readonly precedence = Number.MAX_SAFE_INTEGER
	constructor(readonly criteria: Base) {
		super()
	}
	is(value: any): boolean {
		return Array.isArray(value) && value.every(v => this.criteria.is(v))
	}
	toString() {
		return `every(${ this.criteria.toString() })`
	}
}
export function every(criteria: Criteria): Every
export function every(criteria: Criteria, value: any): boolean
export function every(criteria: Criteria, value?: any): Every | boolean {
	const result = new Every(create(criteria))
	return value ? result.is(value) : result
}
