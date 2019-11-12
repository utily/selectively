import { Base } from "./Base"

export class Includes extends Base {
	constructor(readonly needle: string) {
		super()
	}
	is(value: any): boolean {
		return typeof(value) == "string" && value.includes(this.needle)
	}
}
export function includes(needle: string): Includes {
	return new Includes(needle)
}
