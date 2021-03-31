import { Subtraction } from "../Subtraction"
import { addExpression, parseNextExpression } from "./parse"

addExpression((source, previous) => {
	const fetched = source.fetchIf("-")
	return fetched && previous && new Subtraction(previous, parseNextExpression(Subtraction.precedence, source))
})
