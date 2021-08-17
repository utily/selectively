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
			(index = argument.identifier.indexOf(value.toString()))
		) {
			result = isNaN(+argument.input[index]) ? argument.input.splice(index, 1)[0] : +argument.input.splice(index, 1)[0]
		}
		return result
	}
}
