import { Token } from "../lexer"
import { Base as SType } from "./Base"
import { Completion } from "./Completion"
import { Completor } from "./Completor"

export class TObject extends SType {
	readonly class = "object"
	readonly completions: Completion[]
	constructor(readonly properties: Readonly<Record<string, SType>>) {
		super()
		this.completions = Object.keys(this.properties).map(p => ({ value: p }))
	}

	complete(tokens: Token[]): Completion[] {
		let result: Completion[]
		switch (tokens.length) {
			case 0:
				result = this.completions
				break
			case 1:
				result =
					this.match(tokens[0]) && this.properties[tokens[0].value].class == "object"
						? Completion.prepend(tokens[0].value, [{ value: "." }, ...this.completor(tokens.slice(1))])
						: this.match(tokens[0])
						? Completion.prepend(tokens[0].value, this.properties[tokens[0].value].complete(tokens.slice(1)))
						: this.completor(tokens).length > 0
						? this.completor(tokens)
						: this.partial(tokens[0])
				break
			default:
				if (this.match(tokens[0]))
					if (tokens[1].value == ".")
						result = Completion.prepend(
							tokens[0].value + ".",
							this.properties[tokens[0].value].complete(tokens.slice(2))
						)
					else
						result = Completion.prepend(tokens[0].value, this.properties[tokens[0].value].complete(tokens.slice(1)))
				else
					result = this.completor(tokens)
				break
		}
		return result
	}

	partial(token: Token): Completion[] {
		return this.completions.filter(c => c.value.startsWith(token.value))
	}
	match(token: Token): boolean {
		return !!this.properties[token.value]
	}

	completor(tokens: Token[]): Completion[] {
		return TObject.completor
			.map(p => p(tokens, this))
			.reduce<Completion[]>((result, element) => result.concat(element), [])
			.reduce<Completion[]>(
				(result, element) =>
					result.some(p => p.value == element.value && p.cursor == element.cursor) ? result : [...result, element],
				[]
			)
	}
	private static readonly completor: Completor<TObject>[] = []
	static add(...completor: Completor<TObject>[]) {
		this.completor.push(...completor)
	}
}
