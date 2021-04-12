import { Expression } from "../Expression"
import { Rule } from "../Rule"
import { addExpression, parseExpression } from "./Expression"
import { add, parse } from "./parse"
import { Source } from "./Source"

add(getAdder(parse))
addExpression(getAdder(parseExpression))

function getAdder(parser: (source: Source) => Rule | undefined): (source: Source) => Rule | undefined
function getAdder(parser: (source: Source) => Expression | undefined): (source: Source) => Expression | undefined
function getAdder(
	parser: (source: Source) => Rule | Expression | undefined
): (source: Source) => Rule | Expression | undefined {
	return (source: Source) => {
		const result = source.fetchIf("(") && parser(source.clone())
		if (result && !source.fetchIf(")"))
			source.raise("Missing end of parenthesis.")
		return result
	}
}
