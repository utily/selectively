import { Base } from "./Base"

export class StartsWith extends Base {
	constructor(readonly needle: string) {
		super()
	}
	is(value: any): boolean {
		return typeof(value) == "string" && value.startsWith(this.needle)
	}
}
export function startsWith(needle: string): StartsWith {
	return new StartsWith(needle)
}
