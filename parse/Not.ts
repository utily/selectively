import { add, parse } from "./index"
import { Not } from "../Not"

add(source => source.fetchIf("!") && new Not(parse(source)))
