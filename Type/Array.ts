import { Token } from "../lexer"
import { Base as SType } from "./Base"
import { Completion } from "./Completion"

export class Array extends SType {
	readonly class = "array"
	constructor(readonly type: SType) {
		super()
	}
	complete(tokens: Token[]): Completion[] {
		let result: Completion[]
		switch (tokens.length) {
			case 0:
				result = [
					{ value: "." },
					...Array.patterns.filter(p => ["!", ":", ".", "<=", ">=", "<", ">", "*", "**"].some(s => s == p.value)),
				]
				break
			case 1:
				switch (tokens[0].value) {
					case ".":
						result = Completion.prepend(".", [
							...Array.patterns.filter(p => ["!", ":", ".", "<=", ">=", "<", ">", "*", "**"].every(s => s != p.value)),
						])
						break

					default:
						result = Completion.prepend(
							"",
							Array.patterns.filter(c => c.value.startsWith(tokens[0].value))
						)
						break
				}
				break
			default:
				if (tokens[0].value != ".")
					result = []
				else {
					const pattern = Array.patterns.find(c => c.value == tokens[1].value)
					if (pattern)
						// complete pattern
						// TODO: complete from pattern
						result = Completion.prepend("." + tokens[1].value, this.complete(tokens.slice(2)))
					// not complete
					else if (tokens.length == 2)
						result = Completion.prepend(
							".",
							Array.patterns.filter(c => c.value.startsWith(tokens[1].value))
						)
					else
						result = []
				}
				break
		}
		return result
	}

	// complete(tokens: Token[]): Completion[] {
	// 	return tokens.length == 0 ? Array.patterns : Array.patterns.filter(v => v.value.startsWith(tokens[0].value))
	// }
	private static readonly patterns: Completion[] = []
	static add(...pattern: Completion[]) {
		this.patterns.push(...pattern)
	}
}
