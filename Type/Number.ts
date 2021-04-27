/* eslint-disable @typescript-eslint/ban-types */
import { Token } from "../lexer"
import { Base as SType } from "./Base"
import { Completion } from "./Completion"
import { Completor } from "./Completor"

export class Number extends SType {
	readonly class = "number"
	readonly value?: number
	constructor(readonly input?: number) {
		super()
		if (input)
			this.value = input
	}

	complete(input: Token[] | string, baseObject?: SType, type?: SType): Completion[] {
		const tokens = typeof input == "string" ? this.tokenize(input) : input
		return [
			...(tokens.length > 0 && tokens[0].value == ":" && baseObject
				? Completion.prepend(":", baseObject.complete(tokens.slice(1), undefined, this))
				: baseObject && tokens.length >= 0 && type
				? Completion.prepend(" ", baseObject?.complete(tokens, undefined, undefined))
				: []),
			...(type ? Number.completorArgument : Number.completor)
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
		return isNaN(+value) ? false : true
	}
	private static readonly completor: Completor<SType>[] = []
	static add(...pattern: Completor<SType>[]) {
		this.completor.push(...pattern)
	}

	private static readonly completorArgument: Completor<Number>[] = []
	static addArgument(...pattern: Completor<Number>[]) {
		this.completorArgument.push(...pattern)
	}
	static is(value: any | Number): value is Number {
		return value instanceof Number || !global.Number.isNaN(value)
	}
}
