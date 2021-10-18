import { Token } from "./lexer"
import { Rule } from "./Rule"
import { Type } from "./Type"
import { Completor } from "./Type/Completor"

export class Has extends Rule {
	readonly precedence = 85
	readonly class = "Has"
	constructor(readonly property: string) {
		super()
	}
	is(value: any, property?: string): boolean {
		return typeof value == "object" && value
			? Object.entries(value).some(e => {
					property = typeof property == "string" ? property : this.property
					return e[0] == property
						? true
						: typeof e[1] == "object" && e[1]
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

function complete(tokens: Token[], type?: Type.Object, baseObject?: Type.Object): Type.Completion[] | Type.Completion {
	return baseObject && type?.class == "object"
		? Completor.functions(
				tokens,
				(tokens?: Token[]) => type.completions.filter(c => c.value.startsWith(tokens ? tokens[0].value : "")),
				{
					value: "has()",
					cursor: 4,
					suggestion: { value: "has()" },
				}
		  )
		: []
}

Type.Object.add(complete)
