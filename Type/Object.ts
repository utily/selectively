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

	complete(tokens: Token[], baseObject: TObject = this, type?: SType): Completion[] {
		let result: Completion[]
		switch (tokens.length) {
			case 0:
				result = type
					? this.filterByType(type).map(c =>
							this.properties[c.value].class == "object" ? { value: c.value + "." } : { value: c.value }
					  )
					: this.completions
				break
			case 1:
				if (type)
					result =
						this.match(tokens[0]) && this.properties[tokens[0].value].class == "object"
							? [{ value: tokens[0].value + "." }]
							: this.match(tokens[0])
							? Completion.prepend(
									tokens[0].value,
									this.properties[tokens[0].value].complete(tokens.slice(1), baseObject, type)
							  )
							: this.filterByType(type)
									.filter(c => c.value.startsWith(tokens[0].value))
									.map(c => ({ value: c.value + "." }))
				else
					result =
						this.match(tokens[0]) && this.properties[tokens[0].value].class == "object"
							? Completion.prepend(tokens[0].value, [
									{ value: "." },
									...this.completor(tokens.slice(1), baseObject, type),
							  ])
							: this.match(tokens[0])
							? Completion.prepend(
									tokens[0].value,
									this.properties[tokens[0].value].complete(tokens.slice(1), baseObject, type)
							  )
							: this.completor(tokens, baseObject, type).length > 0
							? this.completor(tokens, baseObject, type)
							: this.partial(tokens[0])
				break
			default:
				if (this.match(tokens[0]))
					if (tokens[1].value == ".")
						result = Completion.prepend(
							tokens[0].value + ".",
							this.properties[tokens[0].value].complete(tokens.slice(2), baseObject, type)
						)
					else
						result = Completion.prepend(
							tokens[0].value,
							this.properties[tokens[0].value].complete(tokens.slice(1), baseObject, type)
						)
				else
					result = this.completor(tokens, baseObject, type)
				break
		}
		return result
	}

	filterByType(type: SType): Completion[] {
		const result = this.completions.filter(
			c =>
				this.properties[c.value].class == type.class ||
				(this.properties[c.value].class == "object"
					? (this.properties[c.value] as TObject).filterByType(type).length > 0
					: false)
		)
		return result
	}

	partial(token: Token): Completion[] {
		return this.completions.filter(c => c.value.startsWith(token.value))
	}
	match(token: Token): boolean {
		return !!this.properties[token.value]
	}

	completor(tokens: Token[], baseObject?: TObject, type?: SType): Completion[] {
		return type
			? []
			: TObject.completor
					.map(p => p(tokens, this, baseObject))
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
