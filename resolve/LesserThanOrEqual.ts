import { LesserThanOrEqual } from "../LesserThanOrEqual"
import { replace } from "./replace"
import { add } from "./resolve"

add<LesserThanOrEqual>("LesserThanOrEqual", (definitions, rule, argument) => {
	const parameter = replace.argument(rule.value, argument)
	return parameter ? new LesserThanOrEqual(parameter) : rule
})
