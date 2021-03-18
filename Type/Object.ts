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
		return [
			...(tokens.length == 0 || tokens[0].value != "."
				? []
				: tokens.length == 1
				? Completion.prepend(".", this.completions)
				: this.properties[tokens[1].value]
				? Completion.prepend("." + tokens[1].value, this.properties[tokens[1].value].complete(tokens.slice(2)))
				: Completion.prepend(
						".",
						this.completions.filter(c => c.value.startsWith(tokens[1].value))
				  )),
			...TObject.completor
				.map(p => p(tokens, this))
				.reduce<Completion[]>((result, element) => result.concat(element), []),
		]
	}

	private static readonly completor: Completor<TObject>[] = []
	static add(...completor: Completor<TObject>[]) {
		this.completor.push(...completor)
	}
}
