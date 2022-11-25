import { Criteria } from "./Criteria"
import { Token } from "./lexer"
import { create, Rule } from "./Rule"
import { Type } from "./Type"

export class Or extends Rule {
	readonly precedence = Or.precedence
	readonly class = "Or"
	readonly criteria: Rule[]
	constructor(criteria: Rule[]) {
		super()
		this.criteria = criteria.reduce<Rule[]>((r, c) => (c instanceof Or ? [...r, ...c.criteria] : [...r, c]), []) // flatten
	}
	is(value: any): boolean {
		return this.criteria.some(c => c.is(value))
	}
	get(path: string[]): Rule | undefined {
		return this.criteria.reduce((result, criteria) => result ?? criteria.get(path), undefined)
	}
	toString() {
		return this.criteria.map(c => c.stringify(this.precedence)).join(" | ")
	}
	static readonly precedence = 30
}
export function or(...criteria: Criteria[]): Or {
	return new Or(criteria.map(create))
}

function complete(tokens: Token[], type?: Type, baseObject?: Type.Object): Type.Completion[] | Type.Completion {
	return Type.Completor.operators(
		tokens,
		(tokens?: Token[]) => (tokens && baseObject ? baseObject?.complete(tokens, undefined, undefined) : []),
		{
			value: " | ",
			suggestion: { value: "|", description: "or" },
		}
	)
}

Type.Number.addArgument(complete)
