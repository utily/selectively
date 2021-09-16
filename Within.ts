import { Token } from "./lexer"
import { Rule } from "./Rule"
import { Type } from "./Type"
import { Completor } from "./Type/Completor"

export class Within extends Rule {
	readonly precedence = 85
	readonly class = "Within"
	constructor(readonly value: (string | number)[]) {
		super()
	}
	is(value: any): boolean {
		return this.value.includes(value)
	}
	toString(): string {
		return `within(${this.value})`
	}
}
export function within(criteria: string[]): Within
export function within(criteria: string[], value?: any): boolean
export function within(criteria: string[], value?: any): Within | boolean {
	const result = new Within(criteria)
	return value ? result.is(value) : result
}

function complete(
	tokens: Token[],
	type?: Type.String | Type.Number,
	baseObject?: Type.Object
): Type.Completion[] | Type.Completion {
	return baseObject && type?.class
		? Completor.functions(tokens, (tokens?: Token[]) => [], {
				value: "within()",
				cursor: 7,
				suggestion: { value: "within()" },
		  })
		: []
}

Type.String.add(complete)
Type.Number.add(complete)
