import { Some } from "../Some"
import { parseExpression } from "./Expression"
import { add } from "./parse"

add(source => {
	const result = source.fetchIf(":", "some", "(") && new Some(parseExpression(source.clone()))
	if (result && !source.fetchIf(")"))
		source.raise("Missing end of parenthesis.")
	return result
})
