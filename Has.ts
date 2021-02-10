import { Rule } from "./Rule"

export class Has extends Rule {
	readonly precedence = Number.MAX_SAFE_INTEGER
	readonly class = "Has"
	constructor(readonly property: string) {
		super()
	}
	is(value: any, property?: string): boolean {
		return Array.isArray(value)
			? value.some(e => this.is(e, property))
			: typeof value == "object"
			? Object.entries(value).some(e => {
					property = property ?? this.property
					return e[0] == property
						? true
						: typeof e[1] == "object"
						? this.is(
								e[1],
								property.includes(".") && property.split(".")[0] == e[0] ? property.split(".")[1] : undefined
						  )
						: false
			  })
			: false
	}
	toString(): string {
		return `has(${this.property})`
	}
}
export function has(criteria: string): Has
export function has(criteria: string, value?: any): boolean
export function has(criteria: string, value?: any): Has | boolean {
	const result = new Has(criteria)
	return value ? result.is(value) : result
}
