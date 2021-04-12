import * as selectively from "../index"

describe("parse.GreaterThan", () => {
	it("test rules related comparisons", () => {
		expect(selectively.parse("amount>5")).toEqual(new selectively.Property("amount", new selectively.GreaterThan("5")))
		expect(selectively.parse("amount>5").is({ amount: 6 })).toBeTruthy()
		expect(selectively.parse("amount>5").is({ amount: 4 })).toBeFalsy()
		expect(selectively.parse("verification.amount>5").is({ verification: { amount: 4 } })).toBeFalsy()
		expect(selectively.parse("verification.amount>5").is({ verification: { amount: 6 } })).toBeTruthy()
	})
})
