import { Token } from "../lexer"
import { Base as SType } from "./Base"
import { Completion } from "./Completion"
import { CompletionArgument } from "./CompletionArgument"
import * as Cursor from "./Cursor"

export class TObject extends SType {
	readonly class = "object"
	readonly completions: Completion[]
	constructor(readonly properties: Readonly<Record<string, SType | undefined>>) {
		super()
		this.completions = Object.keys(this.properties).map(p => ({ value: p }))
	}
	complete(tokens: Token[]): Completion[] {
		let result: Completion[]
		switch (tokens.length) {
			case 0:
				result = [
					{ value: "." },
					...TObject.patterns.filter(p => [":", ".", "<=", ">=", "<", ">"].some(s => s == p.value)),
				]
				break
			case 1:
				switch (tokens[0].value) {
					case ".":
						result = Completion.prepend(".", [
							...TObject.patterns.filter(p => [":", ".", "<=", ">=", "<", ">"].every(s => s != p.value)),
							...this.completions,
						])
						break
					default:
						result = Completion.prepend(
							"",
							TObject.patterns.filter(c => c.value.startsWith(tokens[0].value))
						)
						break
				}
				break
			default:
				if (tokens[0].value != ".")
					result = []
				else {
					const propertyType = this.properties[tokens[1].value]
					if (propertyType)
						// complete property
						result = Completion.prepend("." + tokens[1].value, propertyType.complete(tokens.slice(2)))
					else {
						//if tokens[2:3] == "()" then check if tokens[1].value + tokens[2].value 0 tokens[3].value exists
						const pattern = TObject.patterns.find(
							c =>
								c.value.substring(0, !Cursor.is(c.cursor) ? c?.cursor : c.value.length - 1) ==
								tokens[1]?.value + tokens[2]?.value
						)
						// console.log(pattern)
						// console.log(tokens)
						if (pattern) {
							// complete pattern
							// TODO: complete from pattern
							//pattern.complete(tokens.slice(2))
							result = Completion.prepend(
								"." + tokens[1].value + tokens[2]?.value,
								pattern.complete(tokens.slice(3), this)
							) //call complete with the function, e.g. "has()"
						}
						// not complete
						else if (tokens.length == 2)
							result = Completion.prepend(
								".",
								[...TObject.patterns, ...this.completions].filter(c => c.value.startsWith(tokens[1].value))
							)
						else
							result = []
					}
				}
				break
		}
		return result
		// return tokens.length > 1 && tokens[1].value == "."
		// 	? this.properties[tokens[0].value]
		// 			?.complete(tokens.slice(2))
		// 			.map(c => Completion.prepend(tokens[0].value + tokens[1].value, c))
		// 	: tokens.length == 1 && [...this.completions, ...TObject.patterns].some(v => v.value == tokens[0].value)
		// 	? this.complete([tokens[0], { value: "." }])
		// 	: [...this.completions, ...TObject.patterns].filter(v => v.value.startsWith(tokens[0]?.value ?? ""))
	}

	private static readonly patterns: CompletionArgument[] = []
	static add(...pattern: CompletionArgument[]) {
		this.patterns.push(...pattern)
	}
}
/*
 			? [...this.completions, ...TObject.patterns].filter(v =>
					this.complete([tokens[0], { value: v.value[0] >= "a" ? "." : " " }])
			  )
				*/

/*
adam.bertil.cesar<2
adam.has(bertil)
adam.bertil.has(cesar)

startsWith(this.id.second) = this.id.second*
  => .
. => .adam
.ad => adam
.adam => . : | .bertil .has() :
.adam. => bertil has()  "should the dot be present"
adam.bertil => .has() .cesar
adam.bertil.cesar => < <= > >= .toUpperCase()
adam.bertil.cesar< => < <=
adam.bertil.has() => (cesar)   "autocomplete arguments?"

adam.beritl => ?????   "autocomplete wrong values, error?"

adam.list = [bertil, has()]
adam.bertil.list = [cesar, has()]
adam.bertil.cesar.list = [<, <=, >, >=, toUpperCase()]
adam.bertil.has().list = [cesar]


object = {alfa, beta}
object.has() => object.has() 

*/
