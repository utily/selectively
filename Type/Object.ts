import { Base as SType } from "./Base"

export class TObject extends SType {
	readonly class = "object"
	constructor(readonly properties: Readonly<Record<string, SType>>) {
		super()
	}
}
