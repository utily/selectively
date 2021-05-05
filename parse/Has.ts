import { Has } from "../Has"
import { add } from "./parse"

add(source => {
	const fetched = source.fetchIf("has", "(", "any", ")") || source.fetchIf(":", "has", "(", "any", ")")
	return fetched && new Has(fetched.length == 4 ? fetched[2].value : fetched[3].value)
})
