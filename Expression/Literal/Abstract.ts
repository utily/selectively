import { Serializable } from "../../Serializable";
import { Abstract as Expression } from "../Abstract";

export abstract class Abstract<V extends Serializable.Value> extends Expression<V> {
	readonly precedence = Number.MAX_SAFE_INTEGER
	constructor(readonly value: V) {
		super()
	}
	evaluate(context: Serializable): V {
		return this.value
	}
	toObject(): { class: string } & Serializable {
		return { ...super.toObject(), value: this.value }
	}
}
