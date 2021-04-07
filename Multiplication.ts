import { Expression } from "./Expression"

export class Multiplication extends Expression {
	readonly precedence = Multiplication.precedence
	readonly symbol = "*"
	constructor(readonly left: Expression, readonly right: Expression) {
		super()
	}
	static readonly precedence = 16
	toString(): string {
		return (
			this.left.stringify(Multiplication.precedence) +
			` ${this.symbol} ` +
			this.right.stringify(Multiplication.precedence)
		)
	}
	evaluate(variable?: any): number {
		return variable
			? this.left.evaluate(variable) * this.right.evaluate(variable)
			: this.left.evaluate() * this.right.evaluate()
	}
}
