import { Contains } from "../Contains"
import { add } from "./parse"

add(source => {
	const fetched = source.fetchIf(":", "contains", "(")
	const parameters: string[] = []
	if (fetched && source.peek()) {
		do {
			parameters.push(source.fetchIf("any")?.value ?? "")
		} while (source.fetchIf(","))
		if (!source.fetchIf(")"))
			source.raise("Missing end of parenthesis.")
	}
	return fetched && parameters.length > 0 ? new Contains(parameters) : undefined
})
