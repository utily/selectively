import * as lexer from "../lexer"
import { Property } from "../Property"
import { add, parseNext } from "./parse"
import { Source } from "./Source"

add(source => {
	const result: string[] = []
	let fetched: lexer.Token[] | lexer.Token | undefined
	while ((fetched = source.fetchIf("identifier", ".")))
		result.push(fetched[0].value)
	if (source.peekIs("identifier", Source.comparator) && (fetched = source.fetchIf("identifier")))
		result.push(fetched.value)
	return result.length > 0
		? result.reduceRight(
				(r, name) => new Property(name, r),
				(source.peekIs("identifier") &&
					!source.peek(1) &&
					result.length > 0 &&
					(fetched = source.fetchIf("identifier")) &&
					new Property(fetched.value)) ||
					parseNext(Property.precedence, source)
		  )
		: undefined
})
