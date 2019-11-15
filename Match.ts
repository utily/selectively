import { Base } from "./Base"

export class Match extends Base {
	readonly precedence = Number.MAX_SAFE_INTEGER
	constructor(readonly criteria: RegExp) {
		super()
	}
	is(value: any): boolean {
		return typeof(value) == "string" && this.criteria.test(value)
	}
	toString() {
		return `/${ this.criteria }/`
	}
}
export function match(criteria: RegExp): Match {
	return new Match(criteria)
}
