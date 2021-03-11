import { Token } from "../lexer"
import { Base as SType } from "./Base"
import { Completion } from "./Completion"
import { Completor } from "./Completor"

export class TArray extends SType {
	readonly class = "array"
	constructor(readonly type: SType) {
		super()
	}

	complete(tokens: Token[]): Completion[] {
		return TArray.completor
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

	private static readonly completor: Completor<TArray>[] = []
	static add(...pattern: Completor<TArray>[]) {
		this.completor.push(...pattern)
	}
}
