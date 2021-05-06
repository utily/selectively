import { isCriteria } from "./Criteria"
import { Expression } from "./Expression"
import { Token } from "./lexer"
import { add, Rule } from "./Rule"
import { some } from "./Some"
import { Type } from "./Type"

export class Is extends Rule {
	readonly precedence = Number.MAX_SAFE_INTEGER
	readonly class = "Is"
	readonly symbol = ":"
	constructor(readonly value: bigint | boolean | number | string | Expression) {
		super()
	}
	is(value: any): boolean
	is(value: any, object?: any): boolean {
		return Array.isArray(value) && isCriteria(this.value)
			? some(this.value, value)
			: (isNaN(+value) ? value : +value) == (typeof this.value == "object" ? this.value.evaluate(object) : this.value)
	}
	toString(): string {
		return this.value.toString()
	}
}
export function is(criteria: bigint | boolean | number | string | Expression): Is
export function is(criteria: bigint | boolean | number | string | Expression, value?: any): boolean
export function is(criteria: bigint | boolean | number | string | Expression, value?: any): Is | boolean {
	const result = new Is(criteria)
	return value ? result.is(value) : result
}
add(criteria =>
	typeof criteria == "bigint" ||
	typeof criteria == "boolean" ||
	typeof criteria == "number" ||
	typeof criteria == "string"
		? new Is(criteria)
		: undefined
)
function complete(tokens: Token[], type: Type.String, baseObject?: Type): Type.Completion[] | Type.Completion {
	return !type.value
		? []
		: tokens.length == 0
		? [{ value: ":", suggestion: { value: ":" } }]
		: tokens[0].value != ":"
		? []
		: (tokens.length == 1 && tokens[0].value == ":") ||
		  (tokens.length == 2 && tokens[0].value == ":" && type?.value?.startsWith(tokens[1].value))
		? Type.Completion.prepend(":", { value: type.value, suggestion: { value: type.value } })
		: []
}

Type.String.add(complete)
