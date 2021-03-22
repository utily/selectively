import { BinaryOperator } from "./BinaryOperator"
import { Expression } from "./Expression"

export class Multiplication extends BinaryOperator {
	readonly precedence = 15
	readonly symbol = "*"
	constructor(readonly left: Expression, readonly right: Expression) {
		super()
	}
	toString(): string {
		return this.left + "*" + this.right
	}
}

export function multiply(left: Expression, right: Expression): number | undefined {
	return typeof left == "number" && typeof right == "number" ? left + right : undefined
}
