import { Token } from "../lexer"
import { Base as SType } from "./Base"
import { Completion } from "./Completion"

export class String extends SType {
	readonly class = "string"
	constructor() {
		super()
	}

	complete(tokens: Token[]): Completion[] {
		let result: Completion[]
		switch (tokens.length) {
			case 0:
				result = [
					{ value: "." },
					...String.patterns.filter(p => ["!", ":", ".", "<=", ">=", "<", ">", "*", "**"].some(s => s == p.value)),
				]
				break
			case 1:
				switch (tokens[0].value) {
					case ".":
						result = Completion.prepend(".", [
							...String.patterns.filter(p => ["!", ":", ".", "<=", ">=", "<", ">", "*", "**"].every(s => s != p.value)),
						])
						break
					default:
						result = Completion.prepend(
							"",
							String.patterns.filter(c => c.value.startsWith(tokens[0].value))
						)
						break
				}
				break
			default:
				if (tokens[0].value != ".")
					result = []
				else {
					const pattern = String.patterns.find(c => c.value == tokens[1].value + tokens[2]?.value + tokens[3]?.value)
					if (pattern)
						// complete pattern
						// TODO: complete from pattern
						result = Completion.prepend(
							"." + tokens[1].value + tokens[2]?.value + tokens[3]?.value,
							this.complete(tokens.slice(4))
						)
					// not complete
					else if (tokens.length == 2)
						result = Completion.prepend(
							".",
							String.patterns.filter(c => c.value.startsWith(tokens[1].value))
						)
					else
						result = []
				}
				break
		}
		return result
	}

	// complete(tokens: Token[]): Completion[] {
	// 	return String.patterns.filter(v => v.value.startsWith(tokens[0]?.value ?? ""))
	// }

	private static readonly patterns: Completion[] = []
	static add(...pattern: Completion[]) {
		this.patterns.push(...pattern)
	}
}

/*
strin  => string
string => : . * ** < <= => >
string. => .toUpperCase()
string: => 
 

kalle.enString: =>
*/
