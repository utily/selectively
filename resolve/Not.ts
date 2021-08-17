import { Not } from "../Not"
import { add, resolve } from "./resolve"

add<Not>("Not", (definitions, rule, argument) => {
	return new Not(resolve(definitions, rule.criteria, argument))
})
