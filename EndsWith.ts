import { Base } from "./Base"

export class EndsWith extends Base {
	constructor(readonly needle: string) {
		super()
	}
	is(value: any): boolean {
		return typeof(value) == "string" && value.endsWith(this.needle)
	}
}
export function endsWith(needle: string): EndsWith
export function endsWith(needle: string, value: any): boolean
export function endsWith(needle: string, value?: any): EndsWith | boolean {
	const result = new EndsWith(needle)
	return value ? result.is(value) : result
}
