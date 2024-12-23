import { Array as TArray } from "./Array"
import { Base } from "./Base"
import { Boolean as TBoolean } from "./Boolean"
import { Completion as TCompletion } from "./Completion"
import { Completor as TCompletor } from "./Completor"
import { Cursor } from "./Cursor"
import { Number as TNumber } from "./Number"
import { TObject } from "./Object"
import { String as TString } from "./String"
import { Transformer as TTransformer } from "./Transformer"
import { Union as TUnion } from "./Union"

export type Type = Base
export namespace Type {
	export function complete(
		template: Base,
		input: string
	): { full: string; cursor?: number | Cursor; addon?: string; description?: string }[] {
		const completions = template.complete(input)
		return completions
			.filter(c => !input.includes(c.value) && c.suggestion?.value)
			.map(c => ({
				full: c.value,
				cursor: c?.cursor ?? c.value.length,
				addon: c?.suggestion?.value,
				description: c?.suggestion?.description,
			}))
	}
	export function convert(value: any): Base {
		let result: Base
		switch (typeof value) {
			case "object":
				result = globalThis.Array.isArray(value)
					? new TArray(value.map(e => convert(e)))
					: new TObject(
							globalThis.Object.entries(value).reduce((r, c) => {
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
	export type Union = TUnion
	export const Union = TUnion
	export const Completor = TCompletor
	export type Transformer = TTransformer
	export const Transformer = TTransformer
}
