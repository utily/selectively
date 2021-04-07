export abstract class Expression {
	readonly precedence: number
	readonly symbol: string
	abstract evaluate(): number
	abstract evaluate(criteria?: any): number
	abstract toString(): string
	stringify(precedence = 0): string {
		let result = this.toString()
		if (this.precedence < precedence)
			result = "(" + result + ")"
		return result
	}
}
export function getPrecedence(symbol: string | undefined): number | undefined {
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
			break
	}
	return result
}
