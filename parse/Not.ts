import { add, parse } from "./index"
import { Not } from "../Not"

add(source => {
	return source.peekIs("!") && source.read() && new Not(parse(source))
})
