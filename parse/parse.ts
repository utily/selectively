import { Error } from "@cogneco/mend"
import { And } from "../And"
import * as lexer from "../lexer"
import { Rule } from "../Rule"
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
