import { Error, IO } from "@cogneco/mend"
import { Base } from "../Base"
import { And } from "../And"
import * as lexer from "./lexer"
import { Source } from "./Source"

export function parse(source: Source): Base
export function parse(source: string, handler?: Error.Handler): Base
export function parse(source: string | Source, handler?: Error.Handler): Base {
	if (typeof(source) == "string")
		source = new Source(lexer.tokenize(IO.StringReader.create(source), handler), handler)
	const result: Base[] = []
	return new And(result)
}
const parsers: ((source: Source) => Base | undefined)[] = []
export function add(parser: (source: Source) => Base | undefined): void {
	parsers.push(parser)
}
