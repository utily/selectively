import { Value } from "../Value"

export namespace replace {
	export function argument(
		value: any,
		argument?: { input?: any[]; identifier?: string[] }
	): Value | string | number | undefined {
		let result: Value | string | number | undefined = undefined
		let index: number
		const name = value.value ?? value
		if (
			argument &&
			argument.input &&
			argument.identifier &&
			argument?.input?.length > 0 &&
			argument?.identifier?.length > 0 &&
			argument.identifier.includes(name)
		) {
			index = argument.identifier.indexOf(name)
			result = isNaN(+argument.input[index]) ? argument.input[index] : +argument.input[index]
		}
		return result
	}
}
