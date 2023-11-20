import { Serializable } from "../Serializable"

export abstract class Abstract<V extends Serializable.Value = any> {
	abstract readonly precedence: number
	abstract readonly class: string
	abstract evaluate(context: Serializable, definitions?: Record<string, Abstract>): V
	abstract toStringHelper(): string
	toString(precedence: number): string {
		const result = this.toStringHelper()
		return this.precedence < precedence ? `(${result})` : result
	}
	toObject(): { class: string } & Serializable {
		return { class: this.class }
	}
}
