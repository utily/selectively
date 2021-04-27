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

	complete(input: Token[] | string, baseObject?: SType): Completion[] {
		const tokens = typeof input == "string" ? this.tokenize(input) : input
		return String.completor
			.map(p => p(tokens, this, baseObject))
			.reduce<Completion[]>((result, element) => result.concat(element), [])
			.reduce<Completion[]>(
				(result, element) =>
					result.some(p => p.value == element.value && p.cursor == element.cursor) ? result : [...result, element],
				[]
			)
	}
	isType(value: any): boolean {
		return false
	}
	private static readonly completor: Completor<SType>[] = []
	static add(...pattern: Completor<SType>[]) {
		this.completor.push(...pattern)
	}
	static is(value: any | String): value is String {
		return value instanceof String
	}
}
