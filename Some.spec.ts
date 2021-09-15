import * as selectively from "./index"

describe("some", () => {
	it("simple", () =>
		expect(
			selectively.is({ status: selectively.some("approved") }, { id: "axb", status: ["denied", "approved"] })
		).toBeTruthy())
	it("negative", () =>
		expect(
			selectively.is({ status: selectively.some("approved") }, { id: "axb", status: ["denied", "returned"] })
		).toBeFalsy())

	it("array", () => {
		const parsed = selectively.parse("array:some(condition)")
		// expect(parsed).toEqual({
		// 	class: "Property",
		// 	criteria: {
		// 		class: "Some",
		// 		criteria: {
		// 			class: "Property",
		// 			criteria: { class: "Is", precedence: 9007199254740991, symbol: ":", value: "value" },
		// 			name: "condition",
		// 			precedence: 80,
		// 			symbol: ".",
		// 		},
		// 		precedence: 100,
		// 	},
		// 	name: "array",
		// 	precedence: 80,
		// 	symbol: ".",
		// })
		const value = { array: ["a", "b", "c", "d"], condition: "a" }
		expect(parsed.is(value)).toEqual(true)
	})
})
