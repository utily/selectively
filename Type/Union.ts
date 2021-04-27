import { Token } from "../lexer"
import { Base as SType } from "./Base"
import { Completion } from "./Completion"

export class Union extends SType {
	readonly class = "union"
	constructor(readonly type?: SType[]) {
		super()
	}

	complete(input: Token[] | string, baseObject?: SType, type?: SType): Completion[] {
		const tokens = typeof input == "string" ? this.tokenize(input) : input
		return this.type
			? this.type
					?.map(t => t?.complete(tokens, baseObject, type) ?? [])
					.reduce<Completion[]>((result, element) => result.concat(element), [])
			: []
	}
	isType(value: any): boolean {
		return value instanceof Union
	}
	static is(value: any | Union): value is Union {
		return value instanceof Union
	}
}
