import { IO, Error, Utilities } from "@cogneco/mend"
import { Source } from "./Source"
import { Token } from "./Token"

function tokenize(reader: IO.Reader, errorHandler: Error.Handler): Utilities.Enumerator<Token> {
	const source = new Source(reader, errorHandler)
	return new Utilities.Enumerator<Token>(() => {
		let result: Token | undefined
		if (!source.isEmpty) {
			while (source.peekIsWhitespace())
				source.read()
			if (source.peekIsSymbol())
				result = { value: source.read(), region: source.mark() }
			else {
				let value: string = ""
				while (!source.peekIsWhitespace() || !source.peekIsSymbol())
					value += source.read()
				if (value)
					result = { value, region: source.mark() }
			}
		}
		return result
	})
}

export {
	Source,
	Token,
	tokenize,
}
