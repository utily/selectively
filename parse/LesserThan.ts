import { LesserThan } from "../LesserThan"
import { add, parseExpression } from "./parse"

add(source => {
	return source.fetchIf("<") && new LesserThan(parseExpression(source))
})
