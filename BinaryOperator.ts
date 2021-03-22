export abstract class BinaryOperator {
	readonly precedence: number
	readonly symbol: string
	readonly left: BinaryOperator | number
	readonly right: BinaryOperator | number
	abstract evaluate(): number
}
