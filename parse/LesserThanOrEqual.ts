import { LesserThanOrEqual } from "../LesserThanOrEqual"
import { parseExpression } from "./Expression"
import { add } from "./parse"

add(source => {
	return source.fetchIf("<=") && new LesserThanOrEqual(parseExpression(source))
})
