import { Expression } from "./Expression"

export abstract class BinaryOperator {
	readonly precedence: number
	readonly symbol: string
	readonly left: Expression
	readonly right: Expression
}
