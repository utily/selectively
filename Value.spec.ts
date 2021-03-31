import * as selectively from "./index"

describe("selectively.Value", () => {
	it("Evaluating number", () => {
		expect(new selectively.Value(5).evaluate()).toEqual(5)
		expect(new selectively.Value(2.5).evaluate()).toEqual(2.5)
		expect(new selectively.Value(-3).evaluate()).toEqual(-3)
	})
	it("2Evaluating string", () => {
		expect(new selectively.Value("5").evaluate()).toEqual(5)
		expect(new selectively.Value("2,5").evaluate()).toEqual(2.5)
		expect(new selectively.Value("-3").evaluate()).toEqual(-3)
	})
	it("3Evaluating object", () => {
		const expression = selectively.parseExpression("amount")
		expect(expression.symbol).toBeFalsy()
		const object = { amount: 5 }
		expect(expression.evaluate(object)).toEqual(5)
		expect(new selectively.Value("-3").evaluate()).toEqual(-3)
	})

	it("Advanced test", () => {
		const expression = selectively.parseExpression("authorization.amount * 1,05")
		const object = { authorization: { amount: 100 } }
		expect(expression.evaluate(object)).toEqual(105)
		expect(new selectively.Value("-3").evaluate()).toEqual(-3)
	})

	it("2Advanced test", () => {
		const expression = selectively.parseExpression("authorization.amount * 1,05")
		const object = { notUsed: 5, authorization: { amount: 100 } }
		expect(expression.evaluate(object)).toEqual(105)
		expect(new selectively.Value("-3").evaluate()).toEqual(-3)
	})
})
