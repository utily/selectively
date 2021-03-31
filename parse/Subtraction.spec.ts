import * as selectively from "../index"

describe("parse.Subtraction", () => {
	it("9test rules related to addition", () => {
		expect(selectively.parseExpression("5 - 6 * 7 - 5").toString()).toEqual("5 - 6 * 7 - 5")
		expect(selectively.parseExpression("5 - 6 * 7 - 5 * 8").toString()).toEqual("5 - 6 * 7 - 5 * 8")
		expect(selectively.parseExpression("5 * 5 - 5").evaluate()).toEqual(20)
		expect(selectively.parseExpression("a * 5 - 5").evaluate({ a: 5 })).toEqual(20)
	})
	it("testet", () => {
		expect(selectively.parseExpression("authorization.amount * 1.05 - authorization.captured.amount"))
	})
})
