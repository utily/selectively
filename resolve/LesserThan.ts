import { LesserThan } from "../LesserThan"
import { replace } from "./replace"
import { add } from "./resolve"

add<LesserThan>("LesserThan", (definitions, rule, argument) => {
	const parameter = replace.argument(rule.value, argument)
	return parameter ? new LesserThan(parameter) : rule
})
