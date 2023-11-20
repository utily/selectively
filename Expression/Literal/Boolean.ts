import { Abstract } from "./Abstract";

export class Boolean extends Abstract<boolean> {
	readonly class: "literal.boolean"
	toStringHelper(): string {
		return this.value.toString()
	}
}






