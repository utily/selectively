export abstract class BinaryOperator {
	readonly precedence: number
	abstract evaluate(): number
	readonly symbol: string
	abstract toString(): string
	stringify(precedence = 0): string {
		let result = this.toString()
		if (this.precedence < precedence)
			result = "(" + result + ")"
		return result
	}
	// createTree(operators: BinaryOperator[], start: number): BinaryOperator {
	// 	return
	// }
}
