export abstract class BinaryOperator {
	readonly precedence: number
	abstract evaluate(left: number, right: number): number
	readonly symbol: string
	readonly left: BinaryOperator | number
	readonly right: BinaryOperator | number
	operate(): number {
		return this.evaluate(
			typeof this.left == "number" ? this.left : this.left.operate(),
			typeof this.right == "number" ? this.right : this.right.operate()
		)
	}
	toString(): string {
		return (
			(this.precedence > (typeof this.left == "number" ? this.precedence : this.left.precedence) ? "(" : "") +
			this.left.toString() +
			(this.precedence > (typeof this.left == "number" ? this.precedence : this.left.precedence) ? ")" : "") +
			this.symbol +
			(this.precedence > (typeof this.right == "number" ? this.precedence : this.right.precedence) ? "(" : "") +
			this.right.toString() +
			(this.precedence > (typeof this.right == "number" ? this.precedence : this.right.precedence) ? ")" : "")
		)
	}
}
