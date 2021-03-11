import { Criteria } from "./Criteria"
import { Token } from "./lexer"
import { create, Rule } from "./Rule"
import { Type } from "./Type"
import { Completion } from "./Type/Completion"
import { Completor } from "./Type/Completor"

export class Every extends Rule {
	readonly precedence = Number.MAX_SAFE_INTEGER
	readonly class = "Every"
	constructor(readonly criteria: Rule) {
		super()
	}
	is(value: any): boolean {
		return global.Array.isArray(value) && value.every(v => this.criteria.is(v))
	}
	toString() {
		return `every(${this.criteria.toString()})`
	}
}
export function every(criteria: Criteria): Every
export function every(criteria: Criteria, value: any): boolean
export function every(criteria: Criteria, value?: any): Every | boolean {
	const result = new Every(create(criteria))
	return value ? result.is(value) : result
}

function complete(tokens: Token[], array: Type.Array): Completion[] | Completion {
	return Completor.functions(tokens, (token?: Token) => [{ value: "TODO" }], { value: "every()", cursor: 6 })
}

Type.Array.add(complete)
