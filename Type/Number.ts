/* eslint-disable @typescript-eslint/ban-types */
import { Token } from "../lexer"
import { Base as SType } from "./Base"
import { Completion } from "./Completion"
import { Completor } from "./Completor"

export class Number extends SType {
	readonly class = "number"
	readonly value: number
	constructor() {
		super()
	}

	complete(tokens: Token[]): Completion[] {
		return Number.completor
			.map(p => p(tokens, this))
			.reduce<Completion[]>(
				(result, element) =>
					Array.isArray(element) ? result.concat(element) : element ? [...result, element] : result,
				[]
			)
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
}
