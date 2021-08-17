import * as selectively from "../index"

describe("parse.FunctionCall", () => {
	it("amount(5)", () => {
		expect(selectively.parse("amount(5)")).toEqual({
			argument: ["5"],
			class: "FunctionCall",
			definition: undefined,
			identifier: "amount",
			precedence: 85,
		})
	})
	it("amount(5, 6)", () => {
		expect(selectively.parse("amount(5, 6)")).toEqual({
			argument: ["5", "6"],
			class: "FunctionCall",
			definition: undefined,
			identifier: "amount",
			precedence: 85,
		})
	})
})
