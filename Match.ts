import { Base } from "./Base"

export class Match extends Base {
	constructor(readonly criteria: RegExp) {
		super()
	}
	is(value: any): boolean {
		return typeof(value) == "string" && this.criteria.test(value)
	}
}
export function match(criteria: RegExp): Match {
	return new Match(criteria)
}
