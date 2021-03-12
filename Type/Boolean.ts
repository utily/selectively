/* eslint-disable @typescript-eslint/ban-types */
import { Token } from "../lexer"
import { Base as SType } from "./Base"
import { Completion } from "./Completion"
import { Completor } from "./Completor"

export class Boolean extends SType {
	readonly class = "boolean"
	readonly value: boolean
	constructor() {
		super()
	}
	complete(tokens: Token[]): Completion[] {
		return Boolean.completor
			.map(p => p(tokens, this))
			.reduce<Completion[]>((result, element) => result.concat(element), [])
			.reduce<Completion[]>(
				(result, element) =>
					result.some(p => p.value == element.value && p.cursor == element.cursor) ? result : [...result, element],
				[]
			)
	}

	private static readonly completor: Completor<Boolean>[] = []
	static add(...pattern: Completor<Boolean>[]) {
		this.completor.push(...pattern)
	}
}
