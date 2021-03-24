import { Is } from "../Is"
import { add } from "./parse"

add(source => {
	source.fetchIf(":")
	const fetched = source.fetchIf("any")
	return fetched && new Is(fetched.value)
})
