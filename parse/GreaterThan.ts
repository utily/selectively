import { GreaterThan } from "../GreaterThan"
import { parseExpression } from "./Expression"
import { add } from "./parse"

add(source => {
	return source.fetchIf(">") && new GreaterThan(parseExpression(source))
})
