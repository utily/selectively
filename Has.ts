import { Token } from "./lexer"
import { Rule } from "./Rule"
import { Type } from "./Type"
import { Completion } from "./Type/Completion"

export class Has extends Rule {
	readonly precedence = 70
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

Type.Object.add({ value: "has()", cursor: 4, complete })

function complete(tokens: Token[], object: Type.Object): Completion[] {
	let result: Completion[]
	const completion: Completion[] = [{ value: "has()", cursor: 4 }]
	switch (tokens.length) {
		case 0:
			result = [{ value: "." }]
			break
		case 1:
			if (tokens[0].value == ".")
				result = Completion.prepend(".", completion)
			else
				result = []
			break
		case 2:
			if (tokens[0].value == "." && tokens[1].value == "has")
				result = Completion.prepend(".", completion)
			else
				result = []
			break
		case 3:
			if (tokens[0].value == "." && tokens[1].value == "has" && tokens[2].value == "(")
				result = Completion.prepend(".", completion)
			else
				result = []
			break
		case 4:
			if (tokens[0].value == "." && tokens[1].value == "has" && tokens[2].value == "(")
				if (tokens[3].value == ")")
					result = Completion.prepend("." + completion[0].value.substring(0, 4), object.completions, ")")
				else
					result = Completion.prepend(
						"." + completion[0].value.substring(0, 4),
						object.completions.filter(c => c.value.startsWith(tokens[3].value)),
						")"
					)
			else
				result = []
			break
		case 5:
			if (tokens[0].value == "." && tokens[1].value == "has" && tokens[2].value == "(" && tokens[4].value == ")")
				result = Completion.prepend(
					"." + completion[0].value.substring(0, 4),
					object.completions.filter(c => c.value.startsWith(tokens[3].value)),
					")"
				)
			else
				result = []
			break
		default:
			result = []
			break
	}
	return result
}
