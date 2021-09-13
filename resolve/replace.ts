import { Value } from "../Value"

export namespace replace {
	export function argument(
		value: any,
		argument?: { input?: any[]; identifier?: string[] }
	): Value | string | number | undefined {
		let result: Value | string | number | undefined = undefined
		let index: number
		if (
			argument &&
			argument.input &&
			argument.identifier &&
			argument?.input?.length > 0 &&
			argument?.identifier?.length > 0 &&
			argument.identifier.includes(value.value)
		) {
			index = argument.identifier.indexOf(value.value)
			result = isNaN(+argument.input[index]) ? argument.input.splice(index, 1)[0] : +argument.input.splice(index, 1)[0]
		}
		return result
	}
}
