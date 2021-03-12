import { Token } from "../lexer"
import { Base as SType } from "./Base"
import { Completion } from "./Completion"
import { Completor } from "./Completor"

export class TObject extends SType {
	readonly class = "object"
	readonly completions: Completion[]
	constructor(readonly properties: Readonly<Record<string, SType>>) {
		super()
		this.completions = Object.keys(this.properties).map(p => ({ value: p }))
	}

	complete(tokens: Token[]): Completion[] {
		let result: Completion[]
		switch (tokens.length) {
			case 0:
				result = []
				break
			case 1:
				if (tokens[0].value == ".")
					result = Completion.prepend(".", this.completions)
				else
					result = []
				break
			default:
				if (tokens[0].value != ".")
					result = []
				else {
					const propertyType = this.properties[tokens[1].value]
					if (propertyType)
						result = Completion.prepend("." + tokens[1].value, propertyType.complete(tokens.slice(2)))
					else if (tokens.length == 2)
						result = Completion.prepend(
							".",
							this.completions.filter(c => c.value.startsWith(tokens[1].value))
						)
					else
						result = []
					break
				}
		}
		result = [
			...result,
			...TObject.completor
				.map(p => p(tokens, this))
				.reduce<Completion[]>(
					(result, element) =>
						Array.isArray(element) ? result.concat(element) : element ? [...result, element] : result,
					[]
				)
				.reduce<Completion[]>(
					(result, element) =>
						result.some(p => p.value == element.value && p.cursor == element.cursor) ? result : [...result, element],
					[]
				),
		]
		return result
	}

	private static readonly completor: Completor<TObject>[] = []
	static add(...completor: Completor<TObject>[]) {
		this.completor.push(...completor)
	}
}

/*
object1 = {id, status}
object2 = {id, hej_då}
protperty(nummer) => property
-----------------------
object1.has(object2.property(1))
------------------------------
.object.id.
object.has()
*/
