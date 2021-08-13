import { Definition } from "../Definition"
import { FunctionCall } from "../FunctionCall"
import { add, resolve } from "./resolve"

add<FunctionCall>("FunctionCall", (definitions, rule, argument) => {
	const thisDefinition: Definition | undefined = definitions.find(d => d.identifier == rule.identifier)
	const property = resolve(definitions, thisDefinition?.rule ?? rule, {
		input: argument?.input?.concat(rule.argument),
		identifier: argument?.input?.concat(thisDefinition?.argument),
	})
	return new FunctionCall(rule.identifier, rule.argument, property)
})
