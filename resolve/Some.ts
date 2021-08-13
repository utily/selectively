import { Some } from "../Some"
import { add, resolve } from "./resolve"

add<Some>("Some", (definitions, rule, argument) => {
	return new Some(resolve(definitions, rule.criteria, argument))
})
