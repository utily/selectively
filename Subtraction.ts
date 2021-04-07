import { Expression } from "./Expression"

export class Subtraction extends Expression {
	readonly precedence = Subtraction.precedence
	readonly symbol = "-"
	constructor(readonly left: Expression, readonly right: Expression) {
		super()
	}
	static readonly precedence = 15
	toString(): string {
		return (
			this.left.stringify(Subtraction.precedence) + ` ${this.symbol} ` + this.right.stringify(Subtraction.precedence)
		)
	}
	evaluate(variable?: any): number {
		return variable
			? this.left.evaluate(variable) - this.right.evaluate(variable)
			: this.left.evaluate() - this.right.evaluate()
	}
}
