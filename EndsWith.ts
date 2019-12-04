import { Rule } from "./Rule"

export class EndsWith extends Rule {
	readonly precedence = Number.MAX_SAFE_INTEGER
	readonly class = "EndsWith"
	constructor(readonly needle: string) {
		super()
	}
	is(value: any): boolean {
		return typeof(value) == "string" && value.endsWith(this.needle)
	}
	toString() {
		return `*${ this.needle }`
	}
}
export function endsWith(needle: string): EndsWith
export function endsWith(needle: string, value: any): boolean
export function endsWith(needle: string, value?: any): EndsWith | boolean {
	const result = new EndsWith(needle)
	return value ? result.is(value) : result
}
