import { Error } from "@cogneco/mend"
import { Base as Rule } from "../Rule"
import { And } from "../And"
import * as lexer from "./lexer"
import { Source } from "./Source"

export function parse(source: Source): Rule
export function parse(source: string, handler?: Error.Handler): Rule
export function parse(source: string | Source, handler?: Error.Handler): Rule {
	if (typeof(source) == "string") {
		const tokens = lexer.tokenize(source, handler).toArray()
		source = new Source(tokens, handler || new Error.ConsoleHandler())
	}
	const result: Rule[] = []
	while (source.peek()) {
		for (const parser of parsers) {
			const r = parser(source)
			if (r) {
				result.push(r)
				break
			}
		}
	}
	return result.length == 1 ? result[0] : new And(result)
}
const parsers: ((source: Source) => Rule | undefined | false | "")[] = []
export function add(parser: (source: Source) => Rule | undefined | false | ""): void {
	parsers.push(parser)
}

import "./Not"
import "./Property"
import "./Includes"
import "./StartsWith"
import "./EndsWith"
import "./Is"
