import { GreaterThanOrEqual } from "../GreaterThanOrEqual"
import { add } from "./parse"

add(source => {
	const fetched = source.fetchIf(">=", "any")
	return fetched && new GreaterThanOrEqual(isNaN(+fetched[1].value) ? fetched[1].value : +fetched[1].value)
})
