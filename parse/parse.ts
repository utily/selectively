/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Error } from "@cogneco/mend"
import { And } from "../And"
import { Expression } from "../Expression"
import * as lexer from "../lexer"
import { Rule } from "../Rule"
import { Value } from "../Value"
import { Source } from "./Source"

export function parse(source: Source): Rule
export function parse(source: string, handler?: Error.Handler): Rule
export function parse(source: string | Source, handler?: Error.Handler): Rule {
	if (typeof source == "string") {
		handler = handler || new Error.ConsoleHandler()
		const tokens = lexer.tokenize(source, handler).toArray()
		source = new Source(tokens, handler)
	}
	handler = handler instanceof Rule ? handler : undefined
	const result: Rule[] = []
	while (source.peek())
		result.push(parseNext(0, source))
	return result.length == 1 ? result[0] : new And(result)
}
export function parseNext(previous: Rule | number, source: Source): Rule {
	let result: Rule | undefined
	const precedenceTest: (precedence: number) => boolean =
		typeof previous == "number" ? p => previous < p : p => previous.precedence > p
	const left = typeof previous == "number" ? undefined : previous
	for (const parser of parsers)
		if (precedenceTest(parser[1] || Number.MAX_SAFE_INTEGER)) {
			const r = parser[0](source, left)
			if (r) {
				result = parseNext(r, source)
				break
			}
		}
	return result || left || new And([])
}
const parsers: [(source: Source, previous: Rule | undefined) => Rule | undefined | false | "", number?][] = []
export function add(
	parser: (source: Source, previous: Rule | undefined) => Rule | undefined | false | "",
	precedence?: number
): void {
	parsers.push([parser, precedence])
}

export function parseExpression(source: Source): Expression
export function parseExpression(source: string, handler?: Error.Handler): Expression
export function parseExpression(source: string | Source, handler?: Error.Handler): Expression {
	if (typeof source == "string") {
		handler = handler || new Error.ConsoleHandler()
		const tokens = lexer.tokenize(source, handler).toArray()
		source = new Source(tokens, handler)
	}
	handler = handler instanceof Rule ? handler : undefined
	return parseNextExpression(Number.MAX_SAFE_INTEGER, source)
}
export function parseNextExpression(previous: Expression | number, source: Source): Expression {
	let result: Expression | undefined
	const precedenceTest: (precedence: number) => boolean =
		typeof previous == "number" ? p => previous <= p : p => previous.precedence <= p
	const left = typeof previous == "number" ? undefined : previous
	if (
		source.peek() &&
		(Source.binaryOperator.some(o => source.peek(0)?.value == o || source.peek(1)?.value == o) ||
			!source.peek(1) ||
			(source.peek(1) ? source.peek(1)?.value == "." : false))
	) {
		for (const expressionParser of expressionParsers) {
			if (precedenceTest(expressionParser[1] || Number.MAX_SAFE_INTEGER)) {
				const r = expressionParser[0](source, left)
				if (r) {
					result = r
					break
				}
			}
		}
	}
	if (!(result || left || source.peek()))
		source.raise("Not complete statement")
	return result || left || new Value(source.fetch()!.value)
}
const expressionParsers: [
	(source: Source, previous: Expression | undefined) => Expression | undefined | false,
	number?
][] = []
export function addExpression(
	expressionParser: (source: Source, previous: Expression | undefined) => Expression | undefined | false,
	precedence?: number
): void {
	expressionParsers.push([expressionParser, precedence])
}
