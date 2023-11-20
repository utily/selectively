import { Serializable } from "../../Serializable";
import { Abstract as Expression } from "../Abstract";

export abstract class Abstract<V extends Serializable.Value> extends Expression<V> {
	abstract readonly symbol: string
	toObject(): { class: string } & Serializable {
		return { ...this.toObject(), symbol: this.symbol }
	}
}
