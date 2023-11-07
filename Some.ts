import { Criteria } from "./Criteria"
import { Token } from "./lexer"
import { Property } from "./Property"
import { create, Rule } from "./Rule"
import { Type } from "./Type"

export class Some extends Rule {
	readonly precedence = 100
	readonly class = "Some"
	constructor(readonly criteria: Rule) {
		super()
	}
	is(value: any, object?: any): boolean {
		return (
			Array.isArray(value) &&
			value.some(v =>
				this.criteria instanceof Property ? v == this.criteria.resolve(object) : this.criteria.is(v, object)
			)
		)
	}
	toString() {
		return `some(${this.criteria.toString()})`
	}
}
export function some(criteria: Criteria): Some
export function some(criteria: Criteria, value: any): boolean
export function some(criteria: Criteria, value?: any): Some | boolean {
	const result = new Some(create(criteria))
	return value ? result.is(value) : result
}

function complete(tokens: Token[], type: Type.Array, baseObject?: Type): Type.Completion[] | Type.Completion {
	return tokens.length == 0
		? [{ value: ":", suggestion: { value: ":" } }]
		: tokens[0].value != ":"
		? []
		: tokens.length == 1 && tokens[0].value == ":"
		? Type.Completion.prepend(
				":",
				type.array
					.filter(Type.String.is)
					.filter(e => e.value && e.value != "string")
					.map(e => ({ value: e?.value ?? "", suggestion: { value: e?.value ?? "" } }))
		  )
		: tokens.length == 2 && tokens[0].value == ":"
		? Type.Completion.prepend(
				":",
				type.array
					.filter(Type.String.is)
					.filter(e => e.value && e.value != "string" && e.value.startsWith(tokens[1].value))
					.map(e => ({ value: e?.value ?? "", suggestion: { value: e?.value ?? "" } }))
		  )
		: []
}

Type.Array.add(complete)
