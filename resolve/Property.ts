import { Property } from "../Property"
import { add, resolve } from "./resolve"
add<Property>("Property", (definitions, rule, argument) => {
	return new Property(rule.name, resolve(definitions, rule.criteria, argument))
})
