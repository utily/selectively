import { Expression } from "./Expression"

export class Value extends Expression {
	static readonly precedence = 14
	readonly value: Value | string | number
	constructor(value: Value | string | number, readonly name?: string) {
		super()
		if (typeof value == "string")
			this.value = isNaN(+value.replace(",", ".")) ? value : +value.replace(",", ".")
		else
			this.value = value
	}
	toString(): string {
		return this.name ? `${this.name?.toString()}.` + this.value.toString() : this.value.toString()
	}
	evaluate(variable?: any): number {
		return variable ? this.get(variable) : +this.value
	}
	get(variable?: any): number {
		return typeof this.value == "string"
			? +variable[this.value]
			: this.name && typeof this.value == "object"
			? this.value.get(variable[this.name])
			: +this.value
	}
}
