import { LesserThan } from "../LesserThan"
import { add } from "./parse"

add(source => {
	const fetched = source.fetchIf("<", "any")
	return fetched && new LesserThan(isNaN(+fetched[1].value) ? fetched[1].value : +fetched[1].value)
})
