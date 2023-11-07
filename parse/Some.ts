import { Some } from "../Some"
import { add, parse } from "./parse"

add(source => {
	const fetched = source.fetchIf(":", "some", "(")
	let result
	if (fetched) {
		const parsed = parse(source.clone())
		result = new Some(parsed)
	}
	if (result && !source.fetchIf(")"))
		source.raise("Missing end of parenthesis.")
	return result
})
