import { Is } from "../Is"
import { add } from "./parse"

add(source => {
	const fetched = source.fetchIf("any")
	return fetched && new Is(fetched.value)
})
