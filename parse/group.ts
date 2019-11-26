import { Error, Utilities } from "@cogneco/mend"
import * as lexer from "./lexer"
import { add, parse } from "./index"
import { Source } from "./Source"

add(source => {
	const result = source.fetchIf("(") && parse(createSource(source))
	if (result && !source.fetchIf(")"))
		source.raise("Missing end of parenthesis.")
	return result
})

function createSource(source: Source): Source {
	let nestingCount = 0
	return new Source(new Utilities.Enumerator(() => {
		let result: lexer.Token | undefined
		if (source.peekIs("("))
			nestingCount++
		else if (source.peekIs(")"))
			nestingCount--
		if (nestingCount >= 0)
			result = source.fetch()
		return result
	}), source)
}
