import { Token } from "../lexer"
import { Base as SType } from "./Base"
import { Completion } from "./Completion"

export class Boolean extends SType {
	readonly class = "boolean"
	constructor() {
		super()
	}
	complete(tokens: Token[]): Completion[] {
		let result: Completion[]
		switch (tokens.length) {
			case 0:
				result = [
					{ value: "." },
					...Boolean.patterns.filter(p => ["!", ":", ".", "<=", ">=", "<", ">", "*", "**"].some(s => s == p.value)),
				]
				break
			case 1:
				switch (tokens[0].value) {
					case ".":
						result = Completion.prepend(".", [
							...Boolean.patterns.filter(p =>
								["!", ":", ".", "<=", ">=", "<", ">", "*", "**"].every(s => s != p.value)
							),
						])
						break

					default:
						result = Completion.prepend(
							"",
							Boolean.patterns.filter(c => c.value.startsWith(tokens[0].value))
						)
						break
				}
				break
			default:
				if (tokens[0].value != ".")
					result = []
				else {
					const pattern = Boolean.patterns.find(c => c.value == tokens[1].value)
					if (pattern)
						result = Completion.prepend("." + tokens[1].value, this.complete(tokens.slice(2)))
					else if (tokens.length == 2)
						result = Completion.prepend(
							".",
							Boolean.patterns.filter(c => c.value.startsWith(tokens[1].value))
						)
					else
						result = []
				}
				break
		}
		return result
	}

	private static readonly patterns: Completion[] = [{ value: "true" }, { value: "false" }]
	static add(...pattern: Completion[]) {
		this.patterns.push(...pattern)
	}
}
