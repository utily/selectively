import { addExpression, parseExpression } from "./Expression"
import { add, parse } from "./parse"

add(source => {
	const result = source.fetchIf("(") && parse(source.clone())
	if (result && !source.fetchIf(")"))
		source.raise("Missing end of parenthesis.")
	return result
})
addExpression(source => {
	const result = source.fetchIf("(") && parseExpression(source.clone())
	if (result && !source.fetchIf(")"))
		source.raise("Missing end of parenthesis.")
	return result
})
