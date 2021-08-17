import { Includes } from "../Includes"
import { replace } from "./replace"
import { add } from "./resolve"

add<Includes>("Includes", (definitions, rule, argument) => {
	const parameter = replace.argument(rule.needle, argument)
	return parameter
		? new Includes(typeof parameter == "object" ? parameter.value.toString() : parameter.toString())
		: rule
})
