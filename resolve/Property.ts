import { Property } from "../Property"
import { add, resolve } from "./resolve"
add<Property>("Property", (definitions, rule, argument) => {
	let name = rule.name
	if (argument && argument.length > 0 && rule.name == "arg") {
		name = argument.shift()
	}
	return new Property(name, resolve(definitions, rule.criteria, argument))
})
