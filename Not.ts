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
	get(_: string[]): Rule | undefined {
		return undefined
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
	type?: Type.String | Type.Number | Type.Boolean | Type.Object,
	baseObject?: Type.Object
): Type.Completion[] {
	return type && type.class != "object" && baseObject
		? Completor.expressions(
				tokens,
				(tokens: Token[]) => {
					return tokens[0].value != "!"
						? []
						: Type.Completion.prepend("!", type.complete(tokens.slice(1), baseObject, type))
				},
				{ value: "!", cursor: 1, suggestion: { value: "!", description: "not" } }
		  )
		: []
}

Type.String.add(complete)
Type.Number.add(complete)
Type.Boolean.add(complete)
Type.Object.add(complete)
