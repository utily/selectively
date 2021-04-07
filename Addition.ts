import { Expression } from "./Expression"

export class Addition extends Expression {
	readonly precedence = Addition.precedence
	readonly symbol = "+"
	constructor(readonly left: Expression, readonly right: Expression) {
		super()
	}
	static readonly precedence = 14
	toString(): string {
		return this.left.stringify(Addition.precedence) + ` ${this.symbol} ` + this.right.stringify(Addition.precedence)
	}
	evaluate(variable?: any): number {
		return variable
			? this.left.evaluate(variable) + this.right.evaluate(variable)
			: this.left.evaluate() + this.right.evaluate()
	}
}
