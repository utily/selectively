import { BinaryOperator } from "../BinaryOperator"
import * as lexer from "../lexer"
import { Value } from "../Value"
import { addExpression, parseNextExpression } from "./parse"

addExpression(source => {
	const fetchedArray: string[] = []
	let fetched: lexer.Token[] | lexer.Token | undefined
	while ((fetched = source.fetchIf("identifier", ".")))
		fetchedArray.push(fetched[0].value)
	let result: BinaryOperator | undefined | false
	if (fetchedArray.length == 0) {
		fetched = source.fetchIf("any")
		result = fetched && parseNextExpression(new Value(fetched.value), source)
	} else {
		fetched = source.fetchIf("identifier")
		const fetchedValue = new Value(fetched ? fetched.value : 0)
		result =
			fetchedArray.length > 0 &&
			fetchedArray.reduceRight((r, name) => new Value(isNaN(+r) ? r : +r, name), fetchedValue)
	}
	return result
})
