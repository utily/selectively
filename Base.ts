import { Criteria } from "./Criteria"

export abstract class Base {
	abstract readonly precedence: number
	abstract is(value: any): boolean
	abstract toString(): string
	stringify(precedence: number = 0): string {
		let result = this.toString()
		if (this.precedence < precedence)
			result = "(" + result + ")"
		return result
	}
}
const creators: ((criteria: Criteria) => Base | undefined)[] = [criteria => criteria instanceof Base ? criteria : undefined]
// tslint:disable-next-line: no-shadowed-variable
export function add(create: (criteria: Criteria) => Base | undefined) {
	creators.push(create)
}
let always: Base
export function setFallback(fallback: Base) {
	always = fallback
}
export function create(criteria: Criteria): Base {
	let result: Base | undefined
	for (const c of creators) {
		result = c(criteria)
		if (result)
			break
	}
	return result || always
}
