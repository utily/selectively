import { IO, Error, Utilities } from "@cogneco/mend"
import * as lexer from "./lexer"

export class Source extends Utilities.Enumerator<lexer.Token> implements Error.Handler {
	private tokens: Utilities.BufferedEnumerator<lexer.Token>
	private lastTokens: lexer.Token[] = []
	constructor(tokens: Utilities.Enumerator<lexer.Token>, private errorHandler: Error.Handler) {
		super(() => {
			const result = this.tokens.fetch()
			if (result)
				this.lastTokens.push(result)
			return result
		})
		this.tokens = tokens instanceof Utilities.BufferedEnumerator ? tokens : new Utilities.BufferedEnumerator(tokens)
	}
	clone(): Source {
		return new Source(this.tokens, this.errorHandler)
	}
	peek(position: number = 0): lexer.Token | undefined {
		return this.tokens.peek(position)
	}
	mark(): Utilities.Enumerable<lexer.Token> {
		const result = this.lastTokens
		this.lastTokens = []
		return Utilities.Enumerable.from(result)
	}
	raise(message: string | Error.Message, level: Error.Level = Error.Level.Critical, type = "gramatical", region?: Error.Region): void {
		if (typeof message == "string") {
			if (!region)
				region = this.peek()!.region
			message = new Error.Message(message as string, level, type, region)
		}
		this.errorHandler.raise(message as Error.Message)
	}
}
