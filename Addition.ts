import { BinaryOperator } from "./BinaryOperator"

export class Addition extends BinaryOperator {
	readonly precedence = 14
	readonly symbol = "+"

	evaluate(left: number, right: number): number {
		return left + right
	}
}
