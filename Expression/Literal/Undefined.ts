import { Abstract } from "./Abstract";

export class Undefined extends Abstract<undefined> {
	readonly class: "literal.undefined"
	toStringHelper(): string {
		return "undefined"
	}
}
