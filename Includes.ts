import { Base } from "./Base"

export class Includes extends Base {
	constructor(readonly needle: string) {
		super()
	}
	is(value: any): boolean {
		return typeof(value) == "string" && value.includes(this.needle)
	}
}
export function includes(needle: string): Includes
export function includes(needle: string, value: any): boolean
export function includes(needle: string, value?: any): Includes | boolean {
	const result = new Includes(needle)
	return value ? result.is(value) : result
}
