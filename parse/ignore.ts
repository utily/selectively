import { add } from "./parse"

add(source => {
	source.raise(`Ignoring unknown token "${ source.fetch() }"`)
	return false
})
