import { Is } from "../Is"
import { replace } from "./replace"
import { add } from "./resolve"

add<Is>("Is", (definitions, rule, argument) => {
	const parameter = replace.argument(rule.value, argument)
	return parameter ? new Is(parameter) : rule
})
