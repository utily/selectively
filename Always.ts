import { Base, setFallback } from "./Base"

export class Always extends Base {
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
