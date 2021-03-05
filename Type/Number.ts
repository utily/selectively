import { Token } from "../lexer"
import { Base as SType } from "./Base"
import { Completion } from "./Completion"

export class Number extends SType {
	readonly class = "number"
	constructor() {
		super()
	}
	complete(tokens: Token[]) {
		return [...Number.patterns].filter(v => v.value.startsWith(tokens[0]?.value ?? ""))
	}
	private static readonly patterns: Completion[] = []
	static add(...pattern: Completion[]) {
		this.patterns.push(...pattern)
	}
}
