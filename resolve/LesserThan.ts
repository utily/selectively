import { LesserThan } from "../LesserThan"
import { add } from "./resolve"

add<LesserThan>("LesserThan", (definitions, rule, argument) => {
	let parameter: any | undefined = undefined
	const a = typeof rule.value == "object"
	const b = argument
	const c = (argument?.length ?? 0) > 0
	const d = rule.value.toString() == "arg"
	const e = argument?.[0] ?? "d"
	console.log(a, b, c, d, e)
	if (
		typeof rule.value == "object" &&
		argument &&
		argument.length > 0 &&
		rule.value.toString() == "arg" &&
		argument[0]
	) {
		parameter = isNaN(+argument[0]) ? argument[0] : +argument[0]
	}
	return parameter ? new LesserThan(parameter) : rule
})
