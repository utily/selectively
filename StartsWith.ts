import { Base } from "./Base"

export class StartsWith extends Base {
	constructor(readonly needle: string) {
		super()
	}
	is(value: any): boolean {
		return typeof(value) == "string" && value.startsWith(this.needle)
	}
}
export function startsWith(needle: string): StartsWith
export function startsWith(needle: string, value: any): boolean
export function startsWith(needle: string, value?: any): StartsWith | boolean {
	const result = new StartsWith(needle)
	return value ? result.is(value) : result
}
