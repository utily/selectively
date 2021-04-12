import { LesserThan } from "../LesserThan"
import { parseExpression } from "./Expression"
import { add } from "./parse"

add(source => {
	return source.fetchIf("<") && new LesserThan(parseExpression(source))
})
