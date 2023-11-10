import { isCriteria } from "./Criteria"
import { Expression } from "./Expression"
import { add, Rule } from "./Rule"
import { some } from "./Some"

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
			: (typeof value == "boolean" ? value.toString() : isNaN(+value) ? value : +value) ==
					(typeof this.value == "object" ? this.value.evaluate(object) : this.value)
	}
	toString(): string {
		return this.escape(this.value.toString())
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
