import { GreaterThan } from "../GreaterThan"
import { add } from "./parse"

add(source => {
	const fetched = source.fetchIf(">", "any")
	return fetched && new GreaterThan(isNaN(+fetched[1].value) ? fetched[1].value : +fetched[1].value)
})
