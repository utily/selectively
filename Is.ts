import { add, Rule } from "./Rule"

export class Is extends Rule {
	readonly precedence = Number.MAX_SAFE_INTEGER
	readonly class = "Is"
	readonly symbol = ":"
	constructor(readonly value: bigint | boolean | number | string) {
		super()
	}
	is(value: any): boolean {
		return value == this.value
	}
	toString(): string {
		return this.value.toString()
	}
}
export function is(criteria: bigint | boolean | number | string): Is
export function is(criteria: bigint | boolean | number | string, value?: any): boolean
export function is(criteria: bigint | boolean | number | string, value?: any): Is | boolean {
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
