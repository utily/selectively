import { Criteria } from "./Criteria"
import { Token } from "./lexer"
import { create, Rule } from "./Rule"
import { Type } from "./Type"
import { Completor } from "./Type/Completor"

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

function complete(
	tokens: Token[],
	type: Type.String | Type.Number | Type.Boolean | Type.Object
): Type.Completion[] | Type.Completion {
	return Completor.expressions(
		tokens,
		(tokens: Token[]) => {
			return tokens[0].value != "!"
				? []
				: Type.Completion.prepend("!", type.complete([{ value: "." }, ...(tokens.length > 1 ? tokens : [])]))
		},
		{ value: "!", cursor: 1 }
	)
}

Type.String.add(complete)
Type.Number.add(complete)
Type.Boolean.add(complete)
Type.Object.add(complete)
