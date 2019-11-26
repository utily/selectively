import { add } from "./index"

add(source => {
	source.raise(`Ignoring unknown token "${ source.fetch() }"`)
	return false
})
