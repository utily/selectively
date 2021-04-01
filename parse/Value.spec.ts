import * as selectively from "../index"

describe("parse.Property", () => {
	it("Value nested", () => {
		expect(selectively.parseExpression("wallet.money.test").toString()).toEqual("wallet.money.test")
		expect(selectively.parseExpression("wallet.money.test + 3").toString()).toEqual("wallet.money.test + 3")
	})
	const value = {
		amount: 1000,
		authorization: {
			amount: 1000,
			captured: { amount: 50 },
		},
	}
	it("Reject captures that exceed the authorized amount by more than 5 percent", () => {
		const rule = "authorization.amount * 1.05 - authorization.captured.amount"
		const modifiedValue = JSON.parse(JSON.stringify(value))
		modifiedValue.authorization.captured.amount = 51
		expect(selectively.parseExpression(rule).evaluate(value)).toEqual(1000)
		expect(selectively.parseExpression(rule).evaluate(modifiedValue)).toEqual(999)
	})
})
