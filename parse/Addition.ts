import { Addition } from "../Addition"
import { Expression, getPrecedence } from "../Expression"
import { addExpression, parseNextExpression } from "./parse"

addExpression((source, previous) => {
	let result: Expression | undefined
	let right: Expression | undefined
	if (previous && source.fetchIf("+")) {
		if ((getPrecedence(source.peek(1)?.value) ?? 0) >= Addition.precedence) {
			right = parseNextExpression(Addition.precedence, source)
			result = new Addition(previous, right)
		} else
			result = new Addition(previous, parseNextExpression(Addition.precedence, source))
	}
	if (result)
		result = parseNextExpression(result, source)
	return result
})
