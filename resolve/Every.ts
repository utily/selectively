import { Every } from "../Every"
import { add, resolve } from "./resolve"

add<Every>("Every", (definitions, rule, argument) => {
	return new Every(resolve(definitions, rule.criteria, argument))
})
