import { Rule } from "./Rule"

type Helper =
	number |
	string |
	Rule |
	{ [property: string]: Helper | Helper[] }

export type Criteria = Helper | Helper[]
