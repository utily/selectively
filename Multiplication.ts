import { BinaryOperator } from "./BinaryOperator"

export class Multiplication extends BinaryOperator {
	readonly precedence = 15
	readonly symbol = "*"

	constructor(readonly left: BinaryOperator | number, readonly right: BinaryOperator | number) {
		super()
	}

	evaluate(left: number, right: number): number {
		return left * right
	}
}
