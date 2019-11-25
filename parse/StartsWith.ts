import * as selectively from "../index"
import { add } from "./index"

add(source => {
	const fetched = source.fetchIf("any", "*")
	return fetched && selectively.startsWith(fetched[0].value)
})
