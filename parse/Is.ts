import { Is } from "../Is"
import { parseExpression } from "./Expression"
import { add } from "./parse"
import { Source } from "./Source"

add(source => {
	let expression
	if (source.fetchIf(":")) {
		let algebra = false
		let comparator = false
		let i = 1
		while (!algebra && !comparator && source.peek(i)) {
			algebra = Source.binaryOperator.some(c => (source as Source).peek(i)?.value == c)
			comparator = Source.comparator.some(c => (source as Source).peek(i)?.value == c)
			i++
		}
		if (algebra)
			expression = parseExpression(source)
	}
	const fetched = source.fetchIf("any")

	return expression ? new Is(expression) : fetched && new Is(fetched.value)
})
