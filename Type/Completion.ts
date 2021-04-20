import { Cursor } from "./Cursor"

export interface Completion {
	value: string
	cursor?: Cursor | number
}
export namespace Completion {
	export function stringify(completions: Completion[]): string[] {
		return completions.map(c =>
			typeof c.cursor == "number"
				? c.value.slice(0, c.cursor) + "|" + c.value.slice(c.cursor, c.value.length)
				: c.value + "|"
		)
	}
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
							: Cursor.is(completion.cursor)
							? { start: completion.cursor.start + prefix.length, end: completion.cursor.end + prefix.length }
							: completion.value.length + prefix.length,
			  }
	}
}
