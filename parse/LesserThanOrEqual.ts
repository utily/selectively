import { LesserThanOrEqual } from "../LesserThanOrEqual"
import { add } from "./parse"

add(source => {
	const fetched = source.fetchIf("<=", "any")
	return fetched && new LesserThanOrEqual(isNaN(+fetched[1].value) ? fetched[1].value : +fetched[1].value)
})
