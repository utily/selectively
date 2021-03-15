import { Token } from "../lexer"
import { Base as SType } from "./Base"
import { Completion } from "./Completion"
import { Completor } from "./Completor"

export class Array extends SType {
	readonly class = "array"
	constructor(readonly type: SType) {
		super()
	}

	complete(tokens: Token[]): Completion[] {
		return Array.completor
			.map(p => p(tokens, this))
			.reduce<Completion[]>((result, element) => result.concat(element), [])
			.reduce<Completion[]>(
				(result, element) =>
					result.some(p => p.value == element.value && p.cursor == element.cursor) ? result : [...result, element],
				[]
			)
	}

	private static readonly completor: Completor<Array>[] = []
	static add(...pattern: Completor<Array>[]) {
		this.completor.push(...pattern)
	}
}
