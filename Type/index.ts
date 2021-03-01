import { Array as TArray } from "./Array"
import { Base } from "./Base"
import { Boolean as TBoolean } from "./Boolean"
import { Number as TNumber } from "./Number"
import { TObject } from "./Object"
import { String as TString } from "./String"

export type Type = Base

export namespace Type {
	export type Array = TArray
	export const Array = TArray
	export type Boolean = TBoolean
	export const Boolean = TBoolean
	export type Object = TObject
	export const Object = TObject
	export type String = TString
	export const String = TString
	export type Number = TNumber
	export const Number = TNumber
}
