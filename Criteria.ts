import { Rule } from "./Rule"

type Helper = number | string | Rule | { [property: string]: Helper | Helper[] }

export type Criteria = Helper | Helper[]
export namespace Criteria {
	export const is = isCriteria
}
export function isCriteria(value: any): value is Criteria {
	return typeof value == "number" || typeof value == "string" || value.class instanceof Rule
}
