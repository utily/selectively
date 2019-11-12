import { Base } from "./Base"

export class EndsWith extends Base {
	constructor(readonly needle: string) {
		super()
	}
	is(value: any): boolean {
		return typeof(value) == "string" && value.endsWith(this.needle)
	}
}
export function endsWith(needle: string): EndsWith {
	return new EndsWith(needle)
}
