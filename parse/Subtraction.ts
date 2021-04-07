import { Expression, getPrecedence } from "../Expression"
import { Subtraction } from "../Subtraction"
import { addExpression, parseNextExpression } from "./parse"

addExpression((source, previous) => {
	let result: Expression | undefined
	let right: Expression | undefined
	if (previous && source.fetchIf("-")) {
		if ((getPrecedence(source.peek(1)?.value) ?? 0) >= Subtraction.precedence) {
			right = parseNextExpression(Subtraction.precedence, source)
			result = new Subtraction(previous, right)
		} else
			result = new Subtraction(previous, parseNextExpression(Subtraction.precedence, source))
	}
	if (result)
		result = parseNextExpression(result, source)
	return result
})
