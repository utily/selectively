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
