import { Expression } from "../Expression"
import { Value } from "../Value"
export namespace replace {
	export function argument(
		value: string | number | bigint | boolean | Expression,
		argument?: { input?: any[]; identifier?: string[] }
	): Value | string | number | undefined {
		let result: Value | string | number | undefined = undefined
		let index: number
		const parameter: string = typeof value == "string" ? value : value.toString()
		if (
			argument &&
			argument.input &&
			argument.identifier &&
			argument?.input?.length > 0 &&
			argument?.identifier?.length > 0 &&
			argument.identifier.includes(parameter)
		) {
			index = argument.identifier.indexOf(parameter)
			result = isNaN(+argument.input[index]) ? argument.input[index] : +argument.input[index]
		}
		return result
	}
}
