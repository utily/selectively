import * as selectively from "./index"

describe("or", () => {
	it("both", () => {
		const rule = selectively.parse("authorization.recurring:subsequent")
		const value = { authorization: { recurring: "subsequent" } }
		const failingValue = { recurring: "subsequent" }
		expect(rule.is(value)).toEqual(true)
		expect(rule.is(failingValue)).toEqual(false)
	})

	it("not", () => {
		const rule = selectively.parse("!authorization.recurring:subsequent")
		const value = { authorization: { recurring: "subsequent" } }
		const failingValue = { recurring: "subsequent" }
		expect(rule.is(value)).toEqual(false)
		expect(rule.is(failingValue)).toEqual(true)
	})

	it("and", () => {
		const rule = selectively.parse("authorization.recurring:subsequent authorization.verification:verified")
		const value = { authorization: { recurring: "subsequent", verification: "verified" } }
		const failingValue = { recurring: "subsequent" }
		expect(rule.is(value)).toEqual(true)
		expect(rule.is(failingValue)).toEqual(false)
	})

	it("nand", () => {
		const rule = selectively.parse("!authorization.recurring:subsequent !authorization.verification:verified")
		const value = { authorization: { recurring: "subsequent", verification: "verified" } }
		const failingValue = { authorization: { recurring: undefined } }
		expect(rule.is(value)).toEqual(false)
		expect(rule.is(failingValue)).toEqual(true)
	})
})
