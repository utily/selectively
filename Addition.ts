import { BinaryOperator } from "./BinaryOperator"

export class Addition extends BinaryOperator {
	readonly precedence = Addition.precedence
	readonly symbol = "+"
	constructor(readonly left: BinaryOperator, readonly right: BinaryOperator) {
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
