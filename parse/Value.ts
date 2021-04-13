import { Expression } from "../Expression"
import * as lexer from "../lexer"
import { Value } from "../Value"
import { addExpression, parseNextExpression } from "./Expression"

addExpression((source, previous) => {
	const fetchedArray: string[] = []
	let fetched: lexer.Token[] | lexer.Token | undefined
	while ((fetched = source.fetchIf("identifier", ".")))
		fetchedArray.push(fetched[0].value)
	let result: Expression | undefined | false
	if (fetchedArray.length == 0) {
		fetched = source.fetchIf("any", ".", "any") || source.fetchIf("any")
		result =
			fetched && (Array.isArray(fetched) ? new Value(+fetched.map(t => t.value).join("")) : new Value(fetched.value))
	} else {
		fetched = source.fetchIf("identifier")
		const fetchedValue = new Value(fetched ? fetched.value : 0)
		result =
			fetchedArray.length > 0 &&
			fetchedArray.reduceRight((r, name) => new Value(isNaN(+r) ? r : +r, name), fetchedValue)
	}
	if (result && typeof previous == "number" && !isNaN(previous) && previous != Number.MAX_SAFE_INTEGER)
		result = parseNextExpression(result, source)
	return result
})
