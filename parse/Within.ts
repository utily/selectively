import { Within } from "../Within"
import { add } from "./parse"

add(source => {
	const fetched = source.fetchIf(":", "within", "(")
	let parameters: string[] | undefined
	if (fetched && source.peek()) {
		parameters = [source.fetch()?.value ?? ""]
		while (source.fetchIf(","))
			parameters.push(source.fetchIf("any")?.value ?? "")
		if (!source.fetchIf(")"))
			source.raise("Missing end of parenthesis.")
	}
	return fetched && parameters ? new Within(parameters) : undefined
})
