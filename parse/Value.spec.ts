import * as selectively from "../index"

describe("parse.Property", () => {
	it("Value nested", () => {
		expect(selectively.parseExpression("wallet.money.test").toString()).toEqual("wallet.money.test")
		expect(selectively.parseExpression("wallet.money.test + 3").toString()).toEqual("wallet.money.test + 3")
		expect(selectively.parse("amount<wallet.money.test + 3").toString()).toEqual("amount<wallet.money.test + 3")
		expect(
			selectively.parse("five<authorization.amount + 3").is({ five: 5, authorization: { amount: 100 } })
		).toBeTruthy()
		expect(
			selectively.parse("five<authorization.amount * 3").is({ five: 5, authorization: { amount: 2 } })
		).toBeTruthy()
		expect(selectively.parse("five<authorization.two * 2").is({ five: 5, authorization: { two: 2 } })).toBeFalsy()
		expect(selectively.parse("five<five * 1,08").is({ five: 5, authorization: { two: 2 } })).toBeTruthy()
		expect(selectively.parse("five<authorization.two * 2.6").is({ five: 5, authorization: { two: 2 } })).toBeTruthy()
	})
	const value = {
		amount: 1000,
		authorization: {
			amount: 1000,
			captured: { amount: 50 },
		},
	}
	it("Value rule", () => {
		const rule = "authorization.amount * 1.05 - authorization.captured.amount"
		const modifiedValue = JSON.parse(JSON.stringify(value))
		modifiedValue.authorization.captured.amount = 51
		expect(selectively.parseExpression(rule).evaluate(value)).toEqual(1000)
		expect(selectively.parseExpression(rule).evaluate(modifiedValue)).toEqual(999)
	})
})
