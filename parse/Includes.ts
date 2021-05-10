import { Includes } from "../Includes"
import { add } from "./parse"

add(source => {
	const fetched = source.fetchIf(":", "*", "any", "*") || source.fetchIf("*", "any", "*")
	return fetched && new Includes(fetched.length == 4 ? fetched[2].value : fetched[1].value)
})
