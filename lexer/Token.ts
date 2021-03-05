import { Error } from "@cogneco/mend"

export interface Token {
	value: string
	region?: Error.Region
}

export namespace Token {
	export function isSymbol(token: Token) {
		return ["!", "(", ")", "[", "]", "|", "*", ":", ".", "<=", ">=", "<", ">"].some(s => s == token.value)
	}
}
