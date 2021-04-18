/* eslint-disable @typescript-eslint/ban-types */
import { Token } from "../lexer"
import { Base as SType } from "./Base"
import { Completion } from "./Completion"
import { Completor } from "./Completor"

export class Number extends SType {
	readonly class = "number"
	readonly value: number
	constructor(readonly input?: number) {
		super()
		if (input)
			this.value = input
	}

	complete(tokens: Token[], baseObject?: SType): Completion[] {
		return Number.completor
			.map(p => p(tokens, this, baseObject))
			.reduce<Completion[]>((result, element) => result.concat(element), [])
			.reduce<Completion[]>(
				(result, element) =>
					result.some(p => p.value == element.value && p.cursor == element.cursor) ? result : [...result, element],
				[]
			)
	}

	private static readonly completor: Completor<Number>[] = []
	static add(...pattern: Completor<Number>[]) {
		this.completor.push(...pattern)
	}

	static is(value: any | Number): value is Number {
		return value instanceof Number
	}
}
