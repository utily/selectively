import { Property } from "../Property"
import * as lexer from "./lexer"
import { add, parseNext } from "./index"

add(source => {
	const result: (string)[] = []
	let fetched: lexer.Token[] | undefined
	while (fetched = source.fetchIf("identifier", "."))
		result.push(fetched[0].value)
	if (fetched = source.fetchIf("identifier", ":"))
		result.push(fetched[0].value)
	return result.length > 0 && result.reduceRight((r, name) => new Property(name, r), parseNext(Property.precedence, source))
})
