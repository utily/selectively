import { LesserThanOrEqual } from "../LesserThanOrEqual"
import { add, parseExpression } from "./parse"

add(source => {
	const fetched = source.fetchIf("<=")
	return fetched && new LesserThanOrEqual(parseExpression(source))
})
