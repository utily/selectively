import { EndsWith } from "../EndsWith"
import { replace } from "./replace"
import { add } from "./resolve"

add<EndsWith>("EndsWith", (definitions, rule, argument) => {
	const parameter = replace.argument(rule.needle, argument)
	return parameter
		? new EndsWith(typeof parameter == "object" ? parameter.value.toString() : parameter.toString())
		: rule
})
