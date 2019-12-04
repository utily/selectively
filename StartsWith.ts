import { Rule } from "./Rule"

export class StartsWith extends Rule {
	readonly precedence = Number.MAX_SAFE_INTEGER
	readonly class = "StartsWith"
	constructor(readonly needle: string) {
		super()
	}
	is(value: any): boolean {
		return typeof(value) == "string" && value.startsWith(this.needle)
	}
	toString() {
		return `${ this.needle }*`
	}
}
export function startsWith(needle: string): StartsWith
export function startsWith(needle: string, value: any): boolean
export function startsWith(needle: string, value?: any): StartsWith | boolean {
	const result = new StartsWith(needle)
	return value ? result.is(value) : result
}
