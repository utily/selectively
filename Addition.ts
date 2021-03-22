import { BinaryOperator } from "./BinaryOperator"
import { Expression } from "./Expression"

export class Addition extends BinaryOperator {
	readonly precedence = 17
	readonly symbol = "+"
	constructor(readonly left: Expression, readonly right: Expression) {
		super()
	}
	toString(): string {
		return this.left + "+" + this.right
	}
}

export function add(left: Expression, right: Expression): number | undefined {
	return typeof left == "number" && typeof right == "number" ? left + right : undefined
}
