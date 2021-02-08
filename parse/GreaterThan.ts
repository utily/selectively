import { EndsWith } from "../EndsWith"
import { GreaterThan } from "../GreaterThan"
import { add } from "./parse"

add(source => {
	const fetched = source.fetchIf("<", "any")
	return fetched && new GreaterThan(fetched[1].value)
})
