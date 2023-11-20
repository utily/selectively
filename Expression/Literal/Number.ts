import { Abstract } from "./Abstract";

export class Number extends Abstract<number> {
	readonly class: "literal.number"
	toStringHelper(): string {
		return this.value.toString()
	}
}
