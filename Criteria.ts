import { Rule } from "./Rule"

type Helper = number | string | Rule | { [property: string]: Helper | Helper[] }

export type Criteria = Helper | Helper[]
export namespace Criteria {
	export const is = isCriteria
}
export function isCriteria(value: any, recursive = false): value is Criteria {
	return (
		typeof value == "number" ||
		typeof value == "string" ||
		value instanceof Rule ||
		(recursive &&
			typeof value == "object" &&
			value &&
			Object.values(value).every(value =>
				Array.isArray(value) ? value.every(value => isCriteria(value, true)) : isCriteria(value, true)
			))
	)
}
