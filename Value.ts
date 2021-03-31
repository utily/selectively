import { BinaryOperator } from "./BinaryOperator"

export class Value extends BinaryOperator {
	readonly name: string
	static readonly precedence = 90
	constructor(readonly value: string | number = 0) {
		super()
	}
	toString(): string {
		return this.value.toString()
	}
	evaluate(): number {
		return +this.value
	}
}
