import { LesserThan } from "../LesserThan"
import { add, parseExpression } from "./parse"

add(source => {
	const fetched = source.fetchIf("<")

	return fetched && new LesserThan(parseExpression(source))
})
