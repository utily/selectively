import { LesserThanOrEqual } from "../LesserThanOrEqual"
import { add } from "./parse"

add(source => {
	const fetched = source.fetchIf("<=", "any")
	return fetched && new LesserThanOrEqual(fetched[1].value)
})
