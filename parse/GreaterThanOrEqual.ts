import { GreaterThanOrEqual } from "../GreaterThanOrEqual"
import { add, parseExpression } from "./parse"

add(source => {
	return source.fetchIf(">=") && new GreaterThanOrEqual(parseExpression(source))
})
