import { Definition } from "../Definition"
import { FunctionCall } from "../FunctionCall"
import * as selectively from "../index"
import { tokenize } from "../lexer"
import { resolve } from "./index"

describe("any", () => {
	function t(data: string): string[] {
		return tokenize(data)
			.map(item => item.value)
			.filter(item => item != undefined)
			.toArray() as string[]
	}
	it("simple", () => {
		const testString = "money[5]"
		const parsed = selectively.parse(testString)
		expect(t(testString)).toEqual(["money", "[", "5", "]"])
		expect(parsed).toEqual({
			argument: ["5"],
			class: "functionCall",
			definition: undefined,
			identifier: "money",
			precedence: 85,
		})
		const definitions = new Definition(
			"money",
			[],
			selectively.parse(
				"authorization.amount < arg authorization.verification:verified authorization.recurring:subsequent"
			)
		)
		const resolved = resolve([definitions], parsed)
		// expect(resolved).toEqual("")
		expect(resolved.is({ authorization: { amount: 6, verification: "false", recurring: "false" } })).toEqual(false)
		expect(resolved.is({ authorization: { amount: 5, verification: "false", recurring: "false" } })).toEqual(false)
		expect(resolved.is({ authorization: { amount: 4, verification: "verified", recurring: "subsequent" } })).toEqual(
			true
		)
	})
})
