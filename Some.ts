import { Criteria } from "./Criteria"
import { Token } from "./lexer"
import { create, Rule } from "./Rule"
import { Type } from "./Type"
import { Completor } from "./Type/Completor"

export class Some extends Rule {
	readonly precedence = Number.MAX_SAFE_INTEGER
	readonly class = "Some"
	constructor(readonly criteria: Rule) {
		super()
	}
	is(value: any): boolean {
		return Array.isArray(value) && value.some(v => this.criteria.is(v))
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

function complete(tokens: Token[], type: Type.Array): Type.Completion[] | Type.Completion {
	return Completor.functions(
		tokens,
		(tokens?: Token[]) =>
			type.value.every(Type.String.is) && tokens
				? type.value
						.map(p => p.complete([{ value: ":" }, ...tokens]))
						.reduce<Type.Completion[]>(
							(result, element) =>
								Array.isArray(element) ? result.concat(element) : element ? [...result, element] : result,
							[]
						)
				: !tokens && type.value.every(Type.String.is)
				? type.value
				: type.value.every(Type.Number.is)
				? type.value
						.filter(e => e.value == (tokens ? +tokens[0].value : e.value))
						.map<Type.Completion>(e => ({ value: e.value.toString() }))
				: [],
		{
			value: "some()",
			cursor: 5,
		}
	)
}

Type.Array.add(complete)

Type.Array.add(complete)
