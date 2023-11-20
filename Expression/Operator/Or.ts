import { Serializable } from "../../Serializable";
import { Abstract } from "../Abstract";
import { Infix } from "./Infix"

export class Or extends Infix<boolean> {
	readonly class = "operator.or"
	readonly precedence = 3
	readonly associativity = "left-to-right"
	readonly symbol = "|"
	evaluate(context: Serializable, definitions?: Record<string, Abstract<any>> | undefined): boolean {
		return this.left.evaluate(context, definitions) || this.right.evaluate(context, definitions)
	}
}
