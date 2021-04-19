import { Error } from "@cogneco/mend"
import { Expression } from "../Expression"
import * as lexer from "../lexer"
import { Value } from "../Value"
import { Source } from "./Source"

export function parseExpression(source: Source): Expression
export function parseExpression(source: string, handler?: Error.Handler): Expression
export function parseExpression(source: string | Source, handler?: Error.Handler): Expression {
	if (typeof source == "string") {
		handler = handler || new Error.ConsoleHandler()
		const tokens = lexer.tokenize(source, handler).toArray()
		source = new Source(tokens, handler)
	}
	handler = handler instanceof Expression ? handler : undefined
	let result: Expression | undefined
	let algebra = false
	let comparator = false
	while (!result != algebra && !comparator && source.peek()) {
		let i = 1
		algebra = false
		comparator = false
		while (!algebra && !comparator && source.peek(i)) {
			algebra = Source.binaryOperator.some(c => (source as Source).peek(i)?.value == c)
			comparator = Source.comparator.some(c => (source as Source).peek(i)?.value == c)
			i++
		}
		result = parseNextExpression(result ?? Number.MAX_SAFE_INTEGER, source)
	}
	if (!result)
		source.raise("Missing Expression")
	return result ?? new Value(NaN)
}
export function parseNextExpression(previous: Expression | number, source: Source): Expression | undefined {
	let result: Expression | undefined
	const left = typeof previous == "number" ? undefined : previous
	for (const expressionParser of expressionParsers) {
		const r = expressionParser[0](source, previous)
		if (r) {
			result = r
			break
		}
	}
	return result || left || undefined
}
const expressionParsers: [
	(source: Source, previous: Expression | number | undefined) => Expression | undefined,
	number?
][] = []
export function addExpression(
	expressionParser: (source: Source, previous: Expression | number | undefined) => Expression | undefined,
	precedence?: number
): void {
	expressionParsers.push([expressionParser, precedence])
}
