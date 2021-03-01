import { Base as SType } from "./Base"

export class Array extends SType {
	readonly class = "array"
	constructor(readonly type: SType) {
		super()
	}

	typer() {
		return Object.values(this.class).map(v => typeof v)
	}
}
