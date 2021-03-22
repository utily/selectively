import { BinaryOperator } from "./BinaryOperator"

export class Multiplication extends BinaryOperator {
	readonly precedence = 15
	readonly symbol = "*"
	constructor(readonly left: BinaryOperator | number, readonly right: BinaryOperator | number) {
		super()
	}
	toString(): string {
		return this.left.toString() + "*" + this.right.toString()
	}
	evaluate(): number {
		return (
			(typeof this.left == "number" ? this.left : this.left.evaluate()) *
			(typeof this.right == "number" ? this.right : this.right.evaluate())
		)
	}
}
