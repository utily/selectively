import { Has } from "../Has"
import { add } from "./parse"

add(source => {
	const fetched = source.fetchIf("has", "(", "any", ")")
	return fetched && new Has(fetched[2].value)
})
