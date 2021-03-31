import { GreaterThan } from "../GreaterThan"
import { add, parseExpression } from "./parse"

add(source => {
	const fetched = source.fetchIf(">")

	return fetched && new GreaterThan(parseExpression(source))
})
