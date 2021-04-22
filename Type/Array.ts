import { Token } from "../lexer"
import { Base } from "./Base"
import { Completion } from "./Completion"
import { Completor } from "./Completor"

export class Array extends Base {
	readonly class = "array"
	readonly array: Base[]
	constructor(readonly arrayType: Base | Base[]) {
		super()
		global.Array.isArray(arrayType) ? (this.array = arrayType) : (this.array = [arrayType])
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

	private static readonly completor: Completor<Base>[] = []
	static add(...pattern: Completor<Base>[]) {
		this.completor.push(...pattern)
	}

	static is(value: any | Array): value is Array {
		return value instanceof Array
	}
}
