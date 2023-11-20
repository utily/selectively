import { Abstract } from "./Abstract";

export class Null extends Abstract<number> {
	readonly class: "literal.null"
	toStringHelper(): string {
		return "null"
	}
}
