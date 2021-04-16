/* eslint-disable @typescript-eslint/ban-types */
import { Token } from "../lexer"
import { Base as SType } from "./Base"
import { Completion } from "./Completion"
import { Completor } from "./Completor"

export class String extends SType {
	readonly class = "string"
	readonly value: string
	constructor(readonly input?: string) {
		super()
		if (input)
			this.value = input
	}

	complete(tokens: Token[], baseObject?: SType): Completion[] {
		return String.completor
			.map(p => p(tokens, this, baseObject))
			.reduce<Completion[]>((result, element) => result.concat(element), [])
			.reduce<Completion[]>(
				(result, element) =>
					result.some(p => p.value == element.value && p.cursor == element.cursor) ? result : [...result, element],
				[]
			)
	}

	private static readonly completor: Completor<String>[] = []
	static add(...pattern: Completor<String>[]) {
		this.completor.push(...pattern)
	}

	static is(value: any | String): value is String {
		return value instanceof String
	}
}
