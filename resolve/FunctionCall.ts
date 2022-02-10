import { FunctionCall } from "../FunctionCall"
import { parse } from "../parse"
import { Rule } from "../Rule"
import { add, resolve } from "./resolve"

add<FunctionCall>("FunctionCall", (definitions, rule, argument) => {
	const definition = definitions[rule.identifier]
	const definitionRule: Rule | undefined = definition ? parse(definition.definition) : undefined
	const property = definitionRule
		? resolve(definitions, definitionRule, {
				input: argument?.input?.concat(rule.argument),
				identifier: argument?.identifier?.concat(definition.arguments),
		  })
		: undefined
	return new FunctionCall(rule.identifier, rule.argument, property)
})
