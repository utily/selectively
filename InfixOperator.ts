import { Expression } from "./Expression"

export class InfixOperator extends Expression {
	readonly class = "InfixOperator"
	toString(): string {
		const symbol = this.symbol
		return (
			this.left.stringify(InfixOperator.getPrecedence(symbol)) +
			` ${symbol} ` +
			this.right.stringify(InfixOperator.getPrecedence(symbol))
		)
	}
	constructor(
		readonly symbol: string,
		readonly precedence: number,
		readonly left: Expression,
		readonly right: Expression
	) {
		super()
	}
	evaluate(): number
	evaluate(criteria?: any): number {
		let result: number
		switch (this.getSymbol()) {
			case "+":
				result = this.left.evaluate(criteria) + this.right.evaluate(criteria)
				break
			case "-":
				result = this.left.evaluate(criteria) - this.right.evaluate(criteria)
				break
			case "*":
				result = this.left.evaluate(criteria) * this.right.evaluate(criteria)
				break
			default:
				result = NaN
				break
		}
		return result
	}
	getSymbol(): string {
		return this.symbol
	}
	stringify(precedence = 0): string {
		let result = this.toString()
		if (this.precedence < precedence)
			result = "(" + result + ")"
		return result
	}
	static getPrecedence(symbol: string | undefined): number | undefined {
		let result: number | undefined
		switch (symbol) {
			case "+":
				result = 14
				break
			case "-":
				result = 15
				break
			case "*":
				result = 16
				break
			default:
				result = undefined
				break
		}
		return result
	}
	static create(symbol: string, left: Expression, right: Expression): InfixOperator {
		let result: InfixOperator | undefined
		const fallback = new InfixOperator("+", 14, left, right)
		const precedence = InfixOperator.getPrecedence(symbol)
		if (precedence)
			result = new InfixOperator(symbol, precedence, left, right)
		return result || fallback
	}
}
