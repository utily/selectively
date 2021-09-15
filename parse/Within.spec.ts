import * as selectively from "../index"

describe("parse.within", () => {
	it("simple", () => {
		expect(selectively.parse(":within(test)").toString()).toEqual("within(test)")
		expect(selectively.parse(":within(test)")).toEqual({ class: "Within", precedence: 85, value: ["test"] })
	})
	it("evaluation simple", () => {
		const parsed = selectively.parse("value:within(a, b, c)")
		expect(parsed.is({ value: "a" })).toBeTruthy()
		expect(parsed.is({ value: "d" })).toBeFalsy()
	})
})
