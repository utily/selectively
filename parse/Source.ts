import { Error, Utilities } from "@cogneco/mend"
import * as lexer from "./lexer"

export class Source extends Utilities.BufferedEnumerator<lexer.Token> implements Error.Handler {
	constructor(tokens: lexer.Token[], private errorHandler: Error.Handler) {
		super(new Utilities.ArrayEnumerator(tokens))
	}
	clone(): Source {
		return this
	}
	peekIs(...needles: (RegExp | string| (RegExp | string)[])[]): boolean {
		return needles.every((needle, index) => {
			const peeked = this.peek(index)
			return peeked && peeked.value && Source.is(needle, peeked.value)
		})
	}
	fetchIf(needle: (RegExp | string)): lexer.Token | undefined
	fetchIf(...needles: (RegExp | string | (RegExp | string)[])[]): lexer.Token[] | undefined
	fetchIf(...needles: (RegExp | string | (RegExp | string)[])[]): lexer.Token[] | lexer.Token | undefined {
		const result: (lexer.Token | undefined)[] = []
		if (this.peekIs(...needles))
			needles.forEach(_ => result.push(this.fetch()))
		return needles.length == 1 ? result.length == 1 ? result[0] : undefined : needles.length == result.length ? result as lexer.Token[] : undefined
	}
	mark(): Utilities.Enumerable<lexer.Token> {
		return Utilities.Enumerable.from(Utilities.Enumerable.empty)
	}
	raise(message: string | Error.Message, level: Error.Level = Error.Level.Critical, type = "gramatical", region?: Error.Region): void {
		if (typeof message == "string") {
			if (!region)
				region = this.last!.region
			message = new Error.Message(message as string, level, type, region)
		}
		this.errorHandler.raise(message as Error.Message)
	}
	private static is(needle: string | RegExp | (string | RegExp)[], value: string): boolean {
		return (
			Array.isArray(needle) ? needle.some(n => Source.is(n, value)) :
			typeof(needle) != "string" ? needle.test(value) :
			needle.startsWith("!") && needle != "!" ? !Source.is(needle.substring(1), value) :
			needle == "any" ? Source.symbol.every(s => s != value) :
			needle == "symbol" ? Source.symbol.some(s => s == value) :
			needle == "identifier" ? /[A-Za-z][A-Za-z0-9_]*/.test(value) :
			needle == value
		)
	}
	private static wildcard = ["*", "?"]
	private static separator = ["(", ")", ":", "."]
	private static operator = ["!", "|"]
	private static symbol = [...Source.wildcard, ...Source.separator, ...Source.operator]
}
