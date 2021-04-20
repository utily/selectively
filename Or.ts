import { Criteria } from "./Criteria"
import { Token } from "./lexer"
import { create, Rule } from "./Rule"
import { Type, Types } from "./Type"

export class Or extends Rule {
	readonly precedence = Or.precedence
	readonly class = "Or"
	readonly criteria: Rule[]
	constructor(criterias: Rule[]) {
		super()
		this.criteria = criterias.reduce<Rule[]>((r, c) => (c instanceof Or ? [...r, ...c.criteria] : [...r, c]), []) // flatten
	}
	is(value: any): boolean {
		return this.criteria.some(c => c.is(value))
	}
	toString() {
		return this.criteria.map(c => c.stringify(this.precedence)).join(" | ")
	}
	static readonly precedence = 30
}
export function or(...criterias: Criteria[]): Or {
	return new Or(criterias.map(create))
}

function complete(tokens: Token[], type?: Types, baseObject?: Type.Object): Type.Completion[] | Type.Completion {
	return Type.Completor.operators(
		tokens,
		(tokens?: Token[]) => (tokens && baseObject ? baseObject?.complete(tokens, undefined, undefined) : []),
		{
			value: " | ",
		}
	)
}

Type.Number.addArgument(complete)
