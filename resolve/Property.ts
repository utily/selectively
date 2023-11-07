import { Property } from "../Property"
import { add, resolve } from "./resolve"
add<Property>("Property", (definitions, rule, argument) => {
	return new Property(rule.name, rule.criteria && resolve(definitions, rule.criteria, argument))
})
