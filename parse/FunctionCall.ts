import { FunctionCall } from "../FunctionCall"
import { add } from "./parse"

add(source => {
	const peek = source.peek(3)?.value
	const fetched = [")", ",", "("].find(s => s == peek) ? source.fetchIf("identifier", "(") : undefined
	let parameters: string[] | undefined
	if (fetched && source.peek()) {
		parameters = [source.fetch()?.value ?? ""]
		while (source.fetchIf(",")) {
			parameters.push(source.fetchIf("any")?.value ?? "")
		}
		const test = !source.fetchIf(")")
		if (test)
			source.raise("Missing end of parenthesis.")
	}
	return fetched && parameters ? new FunctionCall(fetched[0].value, parameters) : undefined
})
