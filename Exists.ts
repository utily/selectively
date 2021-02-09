import { Rule } from "./Rule"

export class Exists extends Rule {
	readonly precedence = Number.MAX_SAFE_INTEGER
	readonly class = "Exists"
	constructor(readonly property: string) {
		super()
	}
	is(value: any, property?: string): boolean {
		return Array.isArray(value)
			? value.some(e => this.is(e, property))
			: typeof value == "object"
			? Object.entries(value).some(e => {
					property = property ?? this.property
					return typeof e[1] == "object"
						? this.is(
								e[1],
								property.includes(".") && property.split(".")[0] == e[0] ? property.split(".")[1] : undefined
						  )
						: e[0] == property
			  })
			: false
	}
	toString(): string {
		return `${this.property}`
	}
}
export function exists(criteria: string): Exists
export function exists(criteria: string, value?: any): boolean
export function exists(criteria: string, value?: any): Exists | boolean {
	const result = new Exists(criteria)
	return value ? result.is(value) : result
}
