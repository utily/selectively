import { Array as TArray } from "./Array"
import { Base } from "./Base"
import { Boolean as TBoolean } from "./Boolean"
import { Completion as TCompletion } from "./Completion"
import { Number as TNumber } from "./Number"
import { TObject } from "./Object"
import { String as TString } from "./String"

export type Types = Base | TNumber | TString | TObject | TArray | TBoolean

export namespace Type {
	export function convert(value: any): Base {
		let result: Base
		switch (typeof value) {
			case "object":
				result = global.Array.isArray(value)
					? new TArray(value.map(e => convert(e)))
					: new TObject(
							global.Object.entries(value).reduce((r, c) => {
								return { ...r, [c[0]]: convert(c[1]) }
							}, {})
					  )
				break
			case "string":
				result = new TString(value)
				break
			default:
				result = new TNumber(value)
				break
		}
		return result
	}
	export type Array = TArray
	export const Array = TArray
	export type Boolean = TBoolean
	export const Boolean = TBoolean
	export type Completion = TCompletion
	export const Completion = TCompletion
	export type Object = TObject
	export const Object = TObject
	export type String = TString
	export const String = TString
	export type Number = TNumber
	export const Number = TNumber
}
