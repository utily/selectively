import { GreaterThan } from "../GreaterThan"
import { replace } from "./replace"
import { add } from "./resolve"

add<GreaterThan>("GreaterThan", (definitions, rule, argument) => {
	const parameter = replace.argument(rule.value, argument)
	return parameter ? new GreaterThan(parameter) : rule
})
