import { Token } from "./lexer"
import { Rule } from "./Rule"
import { Type } from "./Type"
import { Completor } from "./Type/Completor"

export class Contains extends Rule {
	readonly precedence = 85
	readonly class = "Contains"
	constructor(readonly criteria: (string | number)[]) {
		super()
	}
	is(value: any, object?: any): boolean {
		return Array.isArray(value) && this.criteria.every(c => value.some(v => c == v))
	}
	toString() {
		return `contains(${this.criteria.join(", ")})`
	}
}
export function contains(criteria: (string | number)[]): Contains
export function contains(criteria: (string | number)[], value: any): boolean
export function contains(criteria: (string | number)[], value?: any): Contains | boolean {
	const result = new Contains(criteria)
	return value ? result.is(value) : result
}
function complete(tokens: Token[], type: Type.Array, baseObject?: Type): Type.Completion[] | Type.Completion {
	// TODO: add arguments function
	return Completor.functions(tokens, () => [], {
		value: "contains()",
		cursor: 9,
		suggestion: { value: "contains()" },
	})
}

Type.Array.add(complete)
