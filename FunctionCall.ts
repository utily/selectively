import { Expression } from "./Expression"
import { Rule } from "./Rule"
export class FunctionCall extends Rule {
	readonly precedence = 85
	readonly class = "FunctionCall"
	constructor(
		readonly identifier: string,
		readonly argument: (bigint | boolean | number | string | Expression)[],
		readonly definition?: Rule
	) {
		super()
	}
	is(value: any): boolean {
		return this.definition?.is(value) ?? true
	}
	toString(): string {
		return `(${this.identifier}(${this.argument.join(", ")}))`
	}
}
export function isType(value: any): value is FunctionCall {
	return typeof value == "object" && value?.class == "FunctionCall"
}
