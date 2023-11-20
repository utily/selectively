import { Serializable } from "../../Serializable";
import { Abstract } from "../Abstract";
import { Infix } from "./Infix"

export class Equals<V extends Serializable.Value> extends Infix<boolean, V, V> {
	readonly class = "operator.equals"
	readonly precedence = 8
	readonly associativity = "left-to-right"
	readonly symbol = ":"
	readonly space = "after"
	evaluate(context: Serializable, definitions?: Record<string, Abstract<any>> | undefined): boolean {
		return this.left.evaluate(context, definitions) == this.right.evaluate(context, definitions)
	}
}
