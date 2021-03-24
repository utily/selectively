import { Every } from "../Every"
import { add, parse } from "./parse"

add(source => {
	const result = source.fetchIf(":", "every", "(") && new Every(parse(source.clone()))
	if (result && !source.fetchIf(")"))
		source.raise("Missing end of parenthesis.")
	return result
})
