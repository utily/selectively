/* eslint-disable @typescript-eslint/ban-types */
import { Token } from "../lexer"
import { Base as SType } from "./Base"
import { Completion } from "./Completion"
import { Completor } from "./Completor"

export class String extends SType {
	readonly class = "string"
	readonly value?: string
	constructor(input?: string) {
		super()
		if (input)
			this.value = input
	}

	complete(input: Token[] | string, baseObject?: SType, type?: SType): Completion[] {
		const tokens = typeof input == "string" ? this.tokenize(input) : input
		let result: Completion[] | undefined
		if (type)
			result = this.value?.startsWith(tokens[0]?.value ?? "")
				? [{ value: this.value, suggestion: { value: this.value } }]
				: undefined
		else
			result =
				tokens.length == 0 || tokens[0].value != ":"
					? undefined
					: this.value?.startsWith(tokens[1]?.value ?? "")
					? [Completion.prepend(":", { value: this.value, suggestion: { value: this.value } })]
					: undefined
		return [
			...(result ?? []),
			...(type ? [] : String.completor)
				.map(p => p(tokens, this, baseObject))
				.reduce<Completion[]>((result, element) => result.concat(element), [])
				.reduce<Completion[]>(
					(result, element) =>
						result.some(p => p.value == element.value && p.cursor == element.cursor) ? result : [...result, element],
					[]
				),
		]
	}
	isType(value: any): boolean {
		return typeof value == "string"
	}
	private static readonly completor: Completor<SType>[] = []
	static add(...pattern: Completor<SType>[]) {
		this.completor.push(...pattern)
	}
	static is(value: any | String): value is String {
		return value instanceof String
	}
}
