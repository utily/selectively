import { Not } from "../Not"
import { add, parseNext } from "./parse"

add(source => source.fetchIf("!") && new Not(parseNext(Not.precedence, source)))
