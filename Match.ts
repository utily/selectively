import { Rule } from "./Rule"

export class Match extends Rule {
	readonly precedence = Number.MAX_SAFE_INTEGER
	readonly class = "Match"
	constructor(readonly criteria: RegExp) {
		super()
	}
	is(value: any): boolean {
		return typeof value == "string" && this.criteria.test(value)
	}
	toString() {
		return `/${this.criteria}/`
	}
}
export function match(criteria: RegExp): Match {
	return new Match(criteria)
}
