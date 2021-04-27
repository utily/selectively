import { Token, tokenize } from "../lexer"
import { Completion } from "./Completion"

export abstract class Base {
	abstract readonly class: string
	abstract complete(token: Token[] | string, baseObject?: Base, type?: Base): Completion[]
	abstract isType(value: any): boolean
	tokenize(input: string): Token[] {
		return tokenize(input, undefined, [
			"!",
			"(",
			")",
			"[",
			"]",
			"|",
			" | ",
			"*",
			":",
			".",
			"<=",
			">=",
			"<",
			">",
			" * ",
			" + ",
			"+",
			" - ",
			"-",
			" / ",
		])
			.map(t => ({ value: t.value }))
			.toArray()
	}
}
