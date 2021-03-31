import { GreaterThanOrEqual } from "../GreaterThanOrEqual"
import { add, parseExpression } from "./parse"

add(source => {
	const fetched = source.fetchIf(">=")
	return fetched && new GreaterThanOrEqual(parseExpression(source))
})
