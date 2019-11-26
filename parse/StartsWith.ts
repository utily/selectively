import { StartsWith } from "../StartsWith"
import { add } from "./index"

add(source => {
	const fetched = source.fetchIf("any", "*")
	return fetched && new StartsWith(fetched[0].value)
})
