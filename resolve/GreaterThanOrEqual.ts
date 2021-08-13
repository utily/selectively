import { GreaterThanOrEqual } from "../GreaterThanOrEqual"
import { replace } from "./replace"
import { add } from "./resolve"

add<GreaterThanOrEqual>("GreaterThanOrEqual", (definitions, rule, argument) => {
	const parameter = replace.argument(rule.value, argument)
	return parameter ? new GreaterThanOrEqual(parameter) : rule
})
