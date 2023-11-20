import { Abstract as Expression } from "../Abstract";
import { Serializable } from "../../Serializable";
import { Abstract } from "./Abstract";

export abstract class Infix<V extends Serializable.Value, L extends Serializable.Value = V, R extends Serializable.Value = V> extends Abstract<V> {
	abstract readonly associativity: "left-to-right" | "right-to-left"
	readonly space: "around" | "before" | "after" | "none" = "around"
	constructor(readonly left: Expression<L>, readonly right: Expression<R>) {
		super()
	}
	toStringHelper(): string {
		const precedence = this.associativity == "left-to-right" ? [this.precedence, this.precedence - 0.5] : [this.precedence - 0.5, this.precedence]
		const space = this.space == "around" || [this.space == "before" ? " " : "", this.space == "after" ? " " : ""]
		return `${this.left.toString(precedence[0])}${space[0]}${this.symbol}${space[1]}${this.right.toString(precedence[1])}}`
	}
	toObject(): { class: string } & Serializable {
		return { ...this.toObject(), left: this.left.toObject(), right: this.toObject() }
	}
}
