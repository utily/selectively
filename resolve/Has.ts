import { Has } from "../Has"
import { replace } from "./replace"
import { add } from "./resolve"

add<Has>("Has", (definitions, rule, argument) => {
	const parameter = replace.argument(rule.property, argument)
	return parameter ? new Has(typeof parameter == "object" ? parameter.value.toString() : parameter.toString()) : rule
})
