import { Addition } from "../Addition"
import { addExpression, parseNextExpression } from "./parse"

addExpression((source, previous) => {
	const fetched = source.fetchIf("+")
	return fetched && previous && new Addition(previous, parseNextExpression(Addition.precedence, source))
})
