export type CompareHelper = [[string, unknown] | number | string, [string, unknown] | number | string] | number | string
export namespace CompareHelper {
	export function formatValue(value: any, keys: string[]) {
		value = keys
			.map(
				k =>
					Object.entries(value).filter(v =>
						typeof v[1] == "object" && !Array.isArray(v[1]) ? formatValue(v[1], keys) : k == v[0]
					)[0]
			)
			.map(mapRecursive)
			.filter(o2 => o2 != undefined)
		if (value.length < 2)
			value = value.length > 0 ? value[0] : undefined
		return value
	}
	export function mapRecursive(input: [string, unknown] | undefined): unknown {
		return input
			? input[1] && typeof input[1] == "object"
				? Object.entries(input[1]).map(mapRecursive)
				: input[1]
			: undefined
	}
	export function adjustInput(value: CompareHelper, input: any): CompareHelper {
		if (Array.isArray(input))
			input = input.map(v => (!Array.isArray(v) && typeof v == "object" ? Object.entries(v) : v))
		else if (typeof input == "object") {
			const keys =
				typeof value == "object"
					? value.filter((o: any) => typeof o == "object").map((o2: [string, unknown]) => o2[0])
					: []
			input = CompareHelper.formatValue(input, keys)
		}
		return input
	}
	export function convert(value: string): string | number | [string, unknown] {
		return value.startsWith("$") ? [value.substring(1), "$"] : value
	}
}
