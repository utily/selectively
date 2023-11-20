import { Serializable } from "../../Serializable";
import { Abstract } from "../Abstract";
import { Infix } from "./Infix"

export class And extends Infix<boolean> {
	readonly class = "operator.and"
	readonly precedence = 4
	readonly associativity = "left-to-right"
	readonly symbol = "&"
	evaluate(context: Serializable, definitions?: Record<string, Abstract<any>> | undefined): boolean {
		return this.left.evaluate(context, definitions) && this.right.evaluate(context, definitions)
	}
}
