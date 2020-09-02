import { Criteria } from "./Criteria"

export abstract class Rule {
	abstract readonly precedence: number
	abstract readonly class: string
	abstract is(value: any): boolean
	filter<T>(value: T[]): T[] {
		return value.filter(element => this.is(element))
	}
	abstract toString(): string
	stringify(precedence = 0): string {
		let result = this.toString()
		if (this.precedence < precedence)
			result = "(" + result + ")"
		return result
	}
}
const creators: ((criteria: Criteria) => Rule | undefined)[] = [
	criteria => (criteria instanceof Rule ? criteria : undefined),
]
export function add(create: (criteria: Criteria) => Rule | undefined) {
	creators.push(create)
}
let always: Rule
export function setFallback(fallback: Rule) {
	always = fallback
}
export function create(criteria: Criteria): Rule {
	let result: Rule | undefined
	for (const c of creators) {
		result = c(criteria)
		if (result)
			break
	}
	return result || always
}
