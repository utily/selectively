import { Not } from "../Not"
import { add, parseNext } from "./index"

add(source => source.fetchIf("!") && new Not(parseNext(Not.precedence, source)))
