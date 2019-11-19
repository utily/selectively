import { Rule, setFallback } from "./Rule"

export class Always extends Rule {
	readonly precedence = Number.MAX_SAFE_INTEGER
	constructor() {
		super()
	}
	is(value: any): boolean {
		return true
	}
	toString(): string {
		return ""
	}
}
setFallback(new Always())
