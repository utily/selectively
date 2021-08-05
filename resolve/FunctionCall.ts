import { FunctionCall } from "../FunctionCall"
import { add, resolve } from "./resolve"
add<FunctionCall>("functionCall", (definitions, rule) => {
	console.log(definitions, rule)
	const property = resolve(
		definitions,
		definitions.find(d => d.identifier == rule.identifier)?.rule ?? new FunctionCall("x", ["x"]),
		rule.argument
	)
	return new FunctionCall(rule.identifier, rule.argument, property)
})
