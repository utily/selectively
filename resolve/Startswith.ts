import { StartsWith } from "../StartsWith"
import { replace } from "./replace"
import { add } from "./resolve"

add<StartsWith>("StartsWith", (definitions, rule, argument) => {
	const parameter = replace.argument(rule.needle, argument)
	return parameter
		? new StartsWith(typeof parameter == "object" ? parameter.value.toString() : parameter.toString())
		: rule
})
