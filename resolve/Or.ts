import { Or } from "../Or"
import { add, resolve } from "./resolve"

add<Or>("Or", (definitions, rule, argument) => new Or(rule.criteria.map(r => resolve(definitions, r, argument))))
