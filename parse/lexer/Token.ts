import { Error } from "@cogneco/mend"

export interface Token {
	value: string | number
	region: Error.Region
}
