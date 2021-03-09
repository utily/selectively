import { Token } from "../lexer"
import { Base as SType } from "./Base"
import { Completion } from "./Completion"
import { Pattern } from "./Pattern"

export class String extends SType {
	readonly class = "string"
	readonly completion: Completion
	constructor(readonly value: Readonly<string>) {
		super()
		this.completion = { value: value }
	}

	complete(tokens: Token[]): Completion[] {
		return String.patterns
			.map(p => p.complete(tokens, this))
			.reduce<Completion[]>(
				(result, element) =>
					Array.isArray(element) ? result.concat(element) : element ? [...result, element] : result,
				[]
			)
			.reduce<Completion[]>(
				(result, element) =>
					result.some(p => p.value == element.value && p.cursor == element.cursor) ? result : [...result, element],
				[]
			)
	}

	private static readonly patterns: Pattern[] = []
	static add(...pattern: Pattern[]) {
		this.patterns.push(...pattern)
	}
}
