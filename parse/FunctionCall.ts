import { FunctionCall } from "../FunctionCall"
import { add } from "./parse"

add(source => {
	const peek = source.peek(3)?.value
	const fetched =
		[")", ",", "("].find(s => s == peek) || source.peek(2)?.value == ")" ? source.fetchIf("identifier", "(") : undefined
	let parameters: string[] | undefined
	if (fetched && source.peek()) {
		// eslint-disable-next-line no-useless-escape
		parameters = [source.fetchIf(/[A-Za-z0-9_\.\-]+/)?.value ?? ""]
		while (source.fetchIf(","))
			// eslint-disable-next-line no-useless-escape
			parameters.push(source.fetchIf(/[A-Za-z0-9_\.\-]+/)?.value ?? "")
		if (!source.fetchIf(")"))
			source.raise("Missing end of parenthesis.")
	}
	return fetched && parameters ? new FunctionCall(fetched[0].value, parameters) : undefined
})
