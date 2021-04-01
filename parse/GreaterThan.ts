import { GreaterThan } from "../GreaterThan"
import { add, parseExpression } from "./parse"

add(source => {
	return source.fetchIf(">") && new GreaterThan(parseExpression(source))
})
