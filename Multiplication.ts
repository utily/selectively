import { BinaryOperator } from "./BinaryOperator"

export class Multiplication extends BinaryOperator {
	readonly precedence = 15
	readonly symbol = "*"

	evaluate(left: number, right: number): number {
		return left * right
	}
}
