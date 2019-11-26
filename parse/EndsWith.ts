import { EndsWith} from "../EndsWith"
import { add } from "./index"

add(source => {
	const fetched = source.fetchIf("*", "any")
	return fetched && new EndsWith(fetched[1].value)
})