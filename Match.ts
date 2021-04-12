import { Token } from "./lexer"
import { Rule } from "./Rule"
import { Type } from "./Type"
import { Completor } from "./Type/Completor"

export class Match extends Rule {
	readonly precedence = Number.MAX_SAFE_INTEGER
	readonly class = "Match"
	constructor(readonly criteria: RegExp) {
		super()
	}
	is(value: any): boolean {
		return typeof value == "string" && this.criteria.test(value)
	}
	toString() {
		return `/${this.criteria}/`
	}
}
export function match(criteria: RegExp): Match {
	return new Match(criteria)
}

function complete(tokens: Token[], string: Type.String): Type.Completion[] | Type.Completion {
	return Completor.expressions(
		tokens,
		(tokens?: Token[]) => {
			return !tokens ||
				(tokens.length == 3 && string.value.includes(tokens[1].value)) ||
				(tokens.length == 2 && tokens[0].value + tokens[1].value == "//")
				? [Type.Completion.prepend("/", { value: string.value }, "/")]
				: tokens.length == 1 && tokens[0].value == "/"
				? [{ value: "//", cursor: 1 }]
				: []
		},
		{ value: "//", cursor: 1 }
	)
}

Type.String.add(complete)
