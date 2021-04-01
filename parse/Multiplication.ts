import { Multiplication } from "../Multiplication"
import { Value } from "../Value"
import { addExpression, parseNextExpression } from "./parse"

addExpression((source, previous) => {
	let fetched = source.fetchIf("*", "any", ".", "any")?.slice(1) || source.fetchIf("*", "any")?.slice(1)
	if (fetched?.length == 3)
		fetched = [
			{
				value: fetched.map(t => t.value).join(""),
			},
		]
	return fetched && previous && parseNextExpression(new Multiplication(previous, new Value(fetched[0].value)), source)
})
