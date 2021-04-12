import { Error, IO, Utilities } from "@cogneco/mend"
import { Source } from "./Source"
import { Token } from "./Token"

function tokenize(reader: IO.Reader | string, errorHandler?: Error.Handler): Utilities.Enumerator<Token> {
	const source = new Source(reader, errorHandler)
	return new Utilities.Enumerator<Token>(() => {
		let result: Token | undefined
		let peekSymbolLength: number | false = 1
		if (!source.isEmpty) {
			while (source.peekIsWhitespace() && !source.peekIsSymbol())
				source.read()
			if ((peekSymbolLength = source.peekIsSymbol()))
				result = { value: source.read(peekSymbolLength) || "", region: source.mark() }
			else {
				let value = ""
				while (!source.isEmpty && !source.peekIsWhitespace() && !source.peekIsSymbol())
					value += source.read()
				if (value)
					result = { value, region: source.mark() }
			}
		}
		return result
	})
}

export { Source, Token, tokenize }
