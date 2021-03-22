import { BinaryOperator } from "./BinaryOperator"

export class Addition extends BinaryOperator {
	readonly precedence = 14
	readonly symbol = "+"

	constructor(readonly left: BinaryOperator | number, readonly right: BinaryOperator | number) {
		super()
	}

	evaluate(left: number, right: number): number {
		return left + right
	}
}
