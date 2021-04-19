/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Expression } from "../Expression"
import { InfixOperator } from "../InfixOperator"
import { addExpression, parseNextExpression } from "./Expression"
import { Source } from "./Source"

addExpression((source, previous) => {
	let result: Expression | undefined
	const symbol = source.peekIs(Source.binaryOperator) && source.fetch()!.value
	let precedence: number | undefined
	if (symbol && typeof previous == "object") {
		let right: Expression | undefined
		let nextPrecedence: number | undefined
		let i = 0
		precedence = InfixOperator.getPrecedence(symbol)
		while (!nextPrecedence && source.peek(i)) {
			nextPrecedence =
				source.peek(i)?.value == "(" ? Number.MAX_SAFE_INTEGER : InfixOperator.getPrecedence(source.peek(i)?.value)
			i++
		}

		if (nextPrecedence && precedence! < nextPrecedence) {
			right = parseNextExpression(precedence!, source)
			if (!right) {
				source.raise("Missing right hand side of " + symbol)
			}
		} else
			right = parseNextExpression(NaN, source)

		if ((nextPrecedence && precedence == nextPrecedence) || nextPrecedence == Number.MAX_SAFE_INTEGER) {
			result = parseNextExpression(new InfixOperator(symbol, precedence!, previous, right!), source)
		} else
			result = new InfixOperator(symbol, precedence!, previous, right!)
	}
	return result
})
