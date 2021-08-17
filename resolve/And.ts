import { And } from "../And"
import { add, resolve } from "./resolve"

add<And>("And", (definitions, rule, argument) => new And(rule.rules.map(r => resolve(definitions, r, argument))))
