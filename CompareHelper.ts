export type CompareHelper = [[string, unknown] | number | string, [string, unknown] | number | string] | number | string
export namespace CompareHelper {
	export function findValue(key: string, input: any): number | string | undefined {
		const result: number | string | undefined = !input
			? undefined
			: Array.isArray(input)
			? input.find(o => findValue(key, o))
			: typeof input == "object"
			? Object.entries(input).reduce<number | string | undefined>((r, c) => {
					return r
						? r
						: (typeof c[1] == "object" && key != c[0]) || (typeof c[1] != "object" && key == c[0])
						? findValue(key, c[1])
						: key == c[0] && Array.isArray(c[1])
						? c[1].find(o => typeof o == "string" || typeof o == "number")
						: undefined
			  }, undefined)
			: typeof input == "number" || typeof input == "string"
			? input
			: undefined
		return result
	}
	export function adjustInput(value: CompareHelper, input: any): CompareHelper {
		if (Array.isArray(input))
			input = input.map(v => (!Array.isArray(v) && typeof v == "object" ? Object.entries(v) : v))
		else if (typeof input == "object") {
			const keys =
				typeof value == "object"
					? value.filter((o: any) => typeof o == "object").map((o2: [string, unknown]) => o2[0])
					: []
			input = keys.map(k => findValue(k, input))
		}
		return input
	}
	export function convert(value: string): string | number | [string, unknown] {
		return value.startsWith("$") ? [value.substring(1), "$"] : value
	}
}
