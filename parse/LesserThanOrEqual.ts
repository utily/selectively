import { LesserThanOrEqual } from "../LesserThanOrEqual"
import { add, parseExpression } from "./parse"

add(source => {
	return source.fetchIf("<=") && new LesserThanOrEqual(parseExpression(source))
})
