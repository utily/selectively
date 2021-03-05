import { Cursor } from "./Cursor"

export interface Completion {
	value: string
	cursor?: Cursor | number
}
export namespace Completion {
	export function prepend(prefix: string, completion: Completion, suffix?: string): Completion
	export function prepend(prefix: string, completions: Completion[], suffix?: string): Completion[]
	export function prepend(
		prefix: string,
		completion: Completion | Completion[],
		suffix?: string
	): Completion | Completion[] {
		return Array.isArray(completion)
			? completion.map(c => prepend(prefix, c, suffix))
			: {
					value: prefix + completion.value + (suffix ?? ""),
					cursor:
						typeof completion?.cursor == "number"
							? completion?.cursor + prefix.length
							: typeof completion?.cursor == "object"
							? { start: completion.cursor.start + prefix.length, end: completion.cursor.end + prefix.length }
							: undefined,
			  }
	}
}
