import { Some } from "../Some"
import { add, parse } from "./index"

add(source => {
	const result = source.fetchIf("some", "(") && new Some(parse(source.clone()))
	if (result && !source.fetchIf(")"))
		source.raise("Missing end of parenthesis.")
	return result
})
