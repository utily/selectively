import { Criteria } from "./Criteria"
import { Token } from "./lexer"
import { create, Rule } from "./Rule"
import { Type } from "./Type"
import { Completor } from "./Type/Completor"

export class Every extends Rule {
	readonly precedence = 100
	readonly class = "Every"
	constructor(readonly criteria: Rule) {
		super()
	}
	is(value: any): boolean {
		return Array.isArray(value) && value.every(v => this.criteria.is(v))
	}
	get(_: string[]): Rule | undefined {
		return undefined
	}
	toString() {
		return `every(${this.criteria.toString()})`
	}
}
export function every(criteria: Criteria): Every
export function every(criteria: Criteria, value: any): boolean
export function every(criteria: Criteria, value?: any): Every | boolean {
	const result = new Every(create(criteria))
	return value ? result.is(value) : result
}

function complete(tokens: Token[], type: Type.Array): Type.Completion[] | Type.Completion {
	const arrayArgumentor = (tokens?: Token[]): Type.Completion[] =>
		type.array.some(Type.String.is) && tokens
			? type.array
					.filter(Type.String.is)
					.map(p => p.complete([{ value: ":" }, ...tokens]))
					.reduce<Type.Completion[]>(
						(result, element) =>
							Array.isArray(element) ? result.concat(element) : element ? [...result, element] : result,
						[]
					)
			: !tokens && type.array.some(Type.String.is)
			? type.array.filter(Type.String.is).map<Type.Completion>(e => ({ value: e?.value ?? "" }))
			: type.array.some(Type.Number.is) && tokens
			? type.array
					.filter(Type.Number.is)
					.map(e => e.complete(tokens))
					.reduce<Type.Completion[]>(
						(result, element) =>
							Array.isArray(element) ? result.concat(element) : element ? [...result, element] : result,
						[]
					)
			: !tokens && type.array.some(Type.Number.is)
			? type.array.filter(Type.Number.is).map<Type.Completion>(e => ({ value: (e?.value ?? "").toString() }))
			: []
	return Completor.functions(tokens, arrayArgumentor, {
		value: "every()",
		cursor: 6,
		suggestion: { value: "every()" },
	})
}

Type.Array.add(complete)
