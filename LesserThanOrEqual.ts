import { Expression } from "./Expression"
import { Token } from "./lexer"
import { Rule } from "./Rule"
import { Type } from "./Type"

export class LesserThanOrEqual extends Rule {
	readonly precedence = 85
	readonly class = "LesserThanOrEqual"
	readonly symbol = "<="
	constructor(readonly value: bigint | boolean | number | string | Expression) {
		super()
	}
	is(value: any): boolean
	is(value: any, object?: any): boolean {
		return (
			(isNaN(+value) ? value : +value) <= (typeof this.value == "object" ? this.value.evaluate(object) : this.value)
		)
	}
	toString(): string {
		return this.value.toString()
	}
}
export function lesserThanOrEqual(criteria: bigint | boolean | number | string): LesserThanOrEqual
export function lesserThanOrEqual(criteria: bigint | boolean | number | string, value?: any): boolean
export function lesserThanOrEqual(
	criteria: bigint | boolean | number | string,
	value?: any
): LesserThanOrEqual | boolean {
	const result = new LesserThanOrEqual(criteria)
	return value ? result.is(value) : result
}
function complete(
	tokens: Token[],
	type: Type.String | Type.Number,
	baseObject: Type.Object
): Type.Completion[] | Type.Completion {
	return Type.Completor.operators(
		tokens,
		(tokens?: Token[]) => (tokens && baseObject ? baseObject?.complete(tokens, undefined, type) : []),
		{
			value: "<=",
		}
	)
}

Type.Number.add(complete)
Type.String.add(complete)
