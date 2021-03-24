import { EndsWith } from "../EndsWith"
import { add } from "./parse"

add(source => {
	const fetched = source.fetchIf(":", "*", "any") || source.fetchIf("*", "any")
	return fetched && new EndsWith(fetched?.length == 3 ? fetched[2].value : fetched[1].value)
})
