import { Base } from "./Base"

export type Criteria =
	number |
	string |
	Base |
	{ [property: string]: Criteria }
