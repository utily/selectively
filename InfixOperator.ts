import { BinaryOperator } from "./BinaryOperator"

export class InfixOperator extends BinaryOperator {
	readonly class = "InfixOperator"
	constructor(
		readonly symbol: string,
		readonly precedence: number,
		readonly left: BinaryOperator,
		readonly right: BinaryOperator
	) {
		super()
	}
	toString(): string {
		const symbol = this.symbol
		return (
			this.left.stringify(InfixOperator.getPrecedence(symbol)) +
			` ${symbol} ` +
			this.right.stringify(InfixOperator.getPrecedence(symbol))
		)
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
	static create(symbol: string, left: BinaryOperator, right: BinaryOperator): InfixOperator {
		let result: InfixOperator | undefined
		const fallback = new InfixOperator("+", 14, left, right)
		const precedence = InfixOperator.getPrecedence(symbol)
		if (precedence)
			result = new InfixOperator(symbol, precedence, left, right)
		return result || fallback
	}
}
