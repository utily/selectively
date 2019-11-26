import { Includes } from "../Includes"
import { add } from "./index"

add(source => {
	const fetched = source.fetchIf("*", "any", "*")
	return fetched && new Includes(fetched[1].value)
})
