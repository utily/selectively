import { Exists } from "../Exists"
import { add } from "./parse"

add(source => {
	const fetched = source.fetchIf("exists(", "any", ")")
	return fetched && new Exists(fetched[1].value)
})
