import { Base } from "./Base"

type Helper =
	number |
	string |
	Base |
	{ [property: string]: Helper | Helper[] }

export type Criteria = Helper | Helper[]
