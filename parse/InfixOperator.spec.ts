import * as selectively from "../index"

describe("parse InfixOperator", () => {
	it("Algebraic Expressions", () => {
		expect(selectively.parseExpression("5 + 7 - 8").toString()).toEqual("5 + 7 - 8")
		expect(selectively.parseExpression("10 - 3 - 2 - 1 - 2 - 3").toString()).toEqual("10 - 3 - 2 - 1 - 2 - 3")
		expect(selectively.parseExpression("10 - 5 - 3 - 2").evaluate()).toEqual(0)
		expect(selectively.parseExpression("8 + 7 * 8 + 5").evaluate()).toEqual(69)
		expect(selectively.parseExpression("10 - 3 * 2 * 1 * 2 * 3").toString()).toEqual("10 - 3 * 2 * 1 * 2 * 3")
	})
	it("Algebraic parenthesis simple", () => {
		expect(selectively.parseExpression("(5 + 7) * 8").evaluate()).toEqual(96)
		expect(selectively.parseExpression("(5 + 7) * 8").toString()).toEqual("(5 + 7) * 8")
		expect(selectively.parseExpression("5 - 6 * (7 - 5) * 8").evaluate()).toEqual(-91)
	})
	it.skip("Algebraic parenthesis complex", () => {
		expect(selectively.parseExpression("5 - (6 * (7 - 5)) * 8").toString()).toEqual("5 - (6 * (7 - 5)) * 8")
	})
})
