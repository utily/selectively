export interface Serializable {
	[property: string]: Serializable.Value
}
export namespace Serializable {
	export type Value = string | number | boolean | undefined | null | Serializable | Value[]
}
