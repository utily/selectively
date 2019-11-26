import { Or } from "../Or"
import { add, parseNext } from "./index"

add((source, previous) => previous && source.fetchIf("|") && new Or([previous, parseNext(Or.precedence, source)]), Or.precedence)
