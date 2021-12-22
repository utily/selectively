import { FunctionCall } from "../FunctionCall"
import { parse } from "../parse"
import { Rule } from "../Rule"
import { add, resolve } from "./resolve"

add<FunctionCall>("FunctionCall", (definitions, rule, argument) => {
	const definition = definitions[rule.identifier]
	const definitionRule: Rule | undefined = definition ? parse(definition.definition) : undefined
	const property = resolve(definitions, definitionRule ?? rule, {
		input: argument?.input?.concat(rule.argument),
		identifier: argument?.identifier?.concat(definition?.arguments),
	})
	return new FunctionCall(rule.identifier, rule.argument, property)
})
