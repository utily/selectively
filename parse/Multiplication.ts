import { Expression, getPrecedence } from "../Expression"
import { Multiplication } from "../Multiplication"
import { Value } from "../Value"
import { addExpression, parseNextExpression } from "./parse"

addExpression((source, previous) => {
	let result: Expression | undefined
	let right: Expression | undefined
	if (previous && source.fetchIf("*")) {
		if ((getPrecedence(source.peek(1)?.value) ?? 0) >= Multiplication.precedence) {
			right = parseNextExpression(Multiplication.precedence, source)
			result = new Multiplication(previous, right)
		} else
			result = new Multiplication(previous, parseNextExpression(new Value(0), source))
	}
	if (result)
		result = parseNextExpression(result, source)
	return result
})
