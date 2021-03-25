import { StartsWith } from "../StartsWith"
import { add } from "./parse"

add(source => {
	const fetched = source.fetchIf(":", "any", "*") || source.fetchIf("any", "*")
	return fetched && new StartsWith(fetched?.length == 3 ? fetched[1].value : fetched[0].value)
})
