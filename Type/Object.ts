import { Token } from "../lexer"
import { Base as SType } from "./Base"
import { Completion } from "./Completion"
import { Completor } from "./Completor"

export class TObject extends SType {
	readonly class = "object"
	readonly completions: Completion[]
	constructor(readonly properties: Readonly<Record<string, SType>>) {
		super()
		this.completions = Object.keys(this.properties).map(p => ({ value: p, suggestion: { value: p } }))
	}

	complete(input: Token[] | string, baseObject?: TObject, type?: SType): Completion[] {
		const tokens = typeof input == "string" ? this.tokenize(input) : input
		let result: Completion[] | undefined
		const filtered = this.filterByType(type)
		if (!baseObject) {
			const matched = tokens.length > 0 ? this.match(tokens[0], filtered) : undefined
			if (matched)
				result =
					tokens.length == 1
						? [
								{ value: matched.value + ".", suggestion: { value: "." } },
								...Completion.prepend(matched.value, this.complete(tokens.slice(1), this, type)),
						  ]
						: tokens.length > 1
						? Completion.prepend(matched.value, this.properties[matched.value].complete(tokens.slice(1), this, type))
						: []
			else if (type && tokens.length > 2 && type.isType(tokens[0].value + tokens[1].value + tokens[2].value))
				result = Completion.prepend(
					tokens[0].value + tokens[1].value + tokens[2].value,
					type.complete(tokens.slice(3), this, type)
				)
			else if (type && tokens.length > 0 && type.isType(tokens[0].value))
				result = Completion.prepend(tokens[0].value, type.complete(tokens.slice(1), this, type))
			else {
				let found: Completion | undefined
				result =
					tokens.length == 0
						? [...this.addDot(filtered, type), ...(type?.class == "number" ? [] : TObject.wildcard)]
						: tokens.length == 1 && (found = TObject.wildcard.find(w => w.value == tokens[0].value))
						? Completion.prepend(found.value, this.completions, type ? "." : "")
						: this.addDot(this.partial(tokens[0], filtered), type)
			}
		} else
			result =
				tokens.length == 0 || tokens[0].value != "."
					? []
					: tokens.length == 1
					? Completion.prepend(".", this.addDot(filtered, type))
					: this.properties[tokens[1].value]
					? Completion.prepend(
							"." + tokens[1].value,
							this.properties[tokens[1].value].complete(tokens.slice(2), baseObject, type)
					  )
					: Completion.prepend(".", this.addDot(this.partial(tokens[1], filtered), type))
		return [
			...result.reduce<Completion[]>(
				(result, element) =>
					result.some(p => p.value == element.value && p.cursor == element.cursor) ? result : [...result, element],
				[]
			),
			...TObject.completor
				.map(p => p(tokens, this, baseObject))
				.reduce<Completion[]>((r, element) => r.concat(element), []),
		]
	}
	filterByType(type?: SType): Completion[] {
		return type
			? this.completions.filter(
					c =>
						this.properties[c.value].class == type.class ||
						(this.properties[c.value].class == "object"
							? (this.properties[c.value] as TObject).filterByType(type).length > 0
							: false)
			  )
			: this.completions
	}
	addDot(completions?: Completion[], type?: SType): Completion[] {
		return !completions
			? []
			: type
			? completions.map(c =>
					this.properties[c.value].class == "object"
						? { value: c.value + ".", suggestion: { value: c.suggestion?.value + "." } }
						: c
			  )
			: completions
	}
	partial(token: Token, completions: Completion[]): Completion[] | undefined {
		const result = completions.filter(c => c.value.startsWith(token.value))
		return result && result.length > 0 ? result : undefined
	}
	match(token: Token, completions: Completion[]): Completion | undefined {
		const result = completions.filter(c => c.value == token.value)
		return result && result.length > 0 ? result[0] : undefined
	}
	isType(value: any): boolean {
		return false
	}
	private static readonly wildcard: Completion[] = [
		{ value: "!", cursor: 1, suggestion: { value: "!", description: "not" } },
	]
	private static readonly completor: Completor<SType>[] = []
	static add(...completor: Completor<SType>[]) {
		this.completor.push(...completor)
	}
}
