import { Abstract } from "./Abstract";

export class String extends Abstract<string> {
	readonly class: "literal.string"
	toStringHelper(): string {
		return String.safe(this.value) ? this.value : `"${String.escape(this.value)}"`
	}
	static safe(value: string): boolean {
		return /^[\p{L}\p{N}_][\p{L}\p{N}_0-9]*$/u.test(value) && !["true", "false", "undefined", "null"].some(v => value == v)
	}
	static escape(value: string): string {
		return value.replace(/["\\]/, "\\$0")
	}
	static unescape(value: string): string {
		return value.replace(/\\(.)/, "$1")
	}
}
