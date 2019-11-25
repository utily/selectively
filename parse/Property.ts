import * as selectively from "../index"
import * as lexer from "./lexer"
import { add, parse } from "./index"

add(source => {
	const result: (string)[] = []
	let fetched: lexer.Token[] | undefined
	while (fetched = source.fetchIf("identifier", "."))
		result.push(fetched[0].value)
	if (fetched = source.fetchIf("identifier", ":"))
		result.push(fetched[0].value)
	return result.length > 0 && selectively.property(result, parse(source))
})
