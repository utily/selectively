import * as selectively from "../index"

describe("parse.GreaterThanOrEqual", () => {
	it("test rules related comparisons", () => {
		expect(selectively.parse("amount>=5")).toEqual(
			new selectively.Property("amount", new selectively.GreaterThanOrEqual("5"))
		)
		expect(selectively.parse("amount>=5").is({ amount: 6 })).toBeTruthy()
		expect(selectively.parse("amount>=5").is({ amount: 4 })).toBeFalsy()
		expect(selectively.parse("verification.amount>=5").is({ verification: { amount: 4 } })).toBeFalsy()
		expect(selectively.parse("verification.amount>=5").is({ verification: { amount: 5 } })).toBeTruthy()
		expect(selectively.parse("verification.amount>=5").is({ verification: { amount: 6 } })).toBeTruthy()
	})
})
