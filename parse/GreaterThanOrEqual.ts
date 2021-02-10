import { CompareHelper } from "../CompareHelper"
import { GreaterThanOrEqual } from "../GreaterThanOrEqual"
import { add } from "./parse"

add(source => {
	const fetched = source.fetchIf("any", ">=", "any") ?? source.fetchIf(">=", "any")
	return (
		fetched &&
		new GreaterThanOrEqual(
			fetched.length > 2
				? [CompareHelper.convert(fetched[0].value), CompareHelper.convert(fetched[2].value)]
				: fetched[1].value
		)
	)
})
