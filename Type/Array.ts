import { Token } from "../lexer"
import { Base } from "./Base"
import { Completion } from "./Completion"
import { Completor } from "./Completor"

export class Array extends Base {
	readonly class = "array"
	readonly array: Base[]
	constructor(input: Base[]) {
		super()
		this.array = input
	}

	complete(input: Token[] | string, baseObject?: Base, type?: Base): Completion[] {
		const tokens = typeof input == "string" ? this.tokenize(input) : input
		return Array.completor
			.flatMap(p => p(tokens, this, baseObject))
			.reduce<Completion[]>(
				(result, element) =>
					result.some(p => p.value == element.value && p.cursor == element.cursor) ? result : [...result, element],
				[]
			)
	}

	isType(value: any): boolean {
		return global.Array.isArray(value)
	}
	private static readonly completor: Completor<Base>[] = []
	static add(...pattern: Completor<Base>[]) {
		this.completor.push(...pattern)
	}

	static is(value: any | Array): value is Array {
		return value instanceof Array
	}
}
