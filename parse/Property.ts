import { add, parse } from "./index"
import { Not } from "../Not"

add(source => {
	let length = 0
	while (source.peek())
	return  source.peekIs(":") && source.read() && new Not(parse(source))
})
