import { Serializable } from "../../Serializable";
import { Abstract } from "../Abstract";
import { Infix } from "./Infix"

export class Addition<V extends number | string> extends Infix<V> {
	readonly class = "operator.addition"
	readonly precedence = 11
	readonly associativity = "left-to-right"
	readonly symbol = "+"
	evaluate(context: Serializable, definitions?: Record<string, Abstract<any>> | undefined): V {
		const left = this.left.evaluate(context, definitions);
		const right = this.right.evaluate(context, definitions);
		return (typeof left == "number" && typeof right == "number" ? left + right : left.toString() + right.toString()) as V
	}
}
