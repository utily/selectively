import { Definition } from "../Definition"
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
		const testString = "ThreeD(250)"
		const parsed = selectively.parse(testString)
		expect(t(testString)).toEqual(["ThreeD", "(", "250", ")"])
		expect(parsed).toEqual({
			argument: ["250"],
			class: "FunctionCall",
			definition: undefined,
			identifier: "ThreeD",
			precedence: 85,
		})
		const definitions = new Definition(
			"ThreeD",
			["threshold"],
			selectively.parse(
				"authorization.amount > thresholded !authorization.verification:verified !authorization.recurring:subsequent"
			)
		)
		const resolved = resolve([definitions], parsed)
		expect(resolved.is({ authorization: { amount: 300, verification: "verified", recurring: "false" } })).toEqual(false)
		expect(resolved.is({ authorization: { amount: 300, verification: "false", recurring: "subsequent" } })).toEqual(
			false
		)
		expect(resolved.is({ authorization: { amount: 300, verification: "false", recurring: "false" } })).toEqual(true)
		expect(resolved.is({ authorization: { amount: 30, verification: "verified", recurring: "false" } })).toEqual(false)
		expect(resolved.is({ authorization: { amount: 30, verification: "false", recurring: "subsequent" } })).toEqual(
			false
		)
		expect(resolved.is({ authorization: { amount: 30, verification: "false", recurring: "false" } })).toEqual(false)
	})
})
