/* eslint-disable @typescript-eslint/ban-types */
import { Token } from "../lexer"
import { Base as SType } from "./Base"
import { Completion } from "./Completion"
import { Completor } from "./Completor"

export class Boolean extends SType {
	readonly class = "boolean"
	readonly value?: boolean
	constructor() {
		super()
	}

	complete(input: Token[] | string, baseObject?: SType, type?: SType): Completion[] {
		const tokens = typeof input == "string" ? this.tokenize(input) : input
		const result: Completion[] | undefined = type
			? Boolean.literals.filter(c => c.value.startsWith(tokens[0]?.value ?? ""))
			: tokens[0]?.value == ":"
			? Completion.prepend(
					":",
					Boolean.literals.filter(c => c.value.startsWith(tokens[1]?.value ?? ""))
			  )
			: []

		return [
			...(result ?? []),
			...(type ? [] : Boolean.completor)
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
		return typeof value == "boolean"
	}
	private static readonly literals: Completion[] = [
		{ value: "true", suggestion: { value: "true" } },
		{ value: "false", suggestion: { value: "false" } },
	]

	private static readonly completor: Completor<SType>[] = []
	static add(...pattern: Completor<SType>[]) {
		this.completor.push(...pattern)
	}
}
