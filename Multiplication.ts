import { BinaryOperator } from "./BinaryOperator"

export class Multiplication extends BinaryOperator {
	readonly precedence = Multiplication.precedence
	readonly symbol = "*"
	constructor(readonly left: BinaryOperator, readonly right: BinaryOperator) {
		super()
	}
	static readonly precedence = 15
	toString(): string {
		return (
			this.left.stringify(Multiplication.precedence) +
			` ${this.symbol} ` +
			this.right.stringify(Multiplication.precedence)
		)
	}
	evaluate(): number {
		return this.left.evaluate() * this.right.evaluate()
	}
}
