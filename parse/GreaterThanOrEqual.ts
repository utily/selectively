import { GreaterThanOrEqual } from "../GreaterThanOrEqual"
import { parseExpression } from "./Expression"
import { add } from "./parse"

add(source => {
	return source.fetchIf(">=") && new GreaterThanOrEqual(parseExpression(source))
})
