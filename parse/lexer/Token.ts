import { Error } from "@cogneco/mend"

export interface Token {
	value: string
	region?: Error.Region
}
