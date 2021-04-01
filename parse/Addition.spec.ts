import * as selectively from "../index"

describe("parse.Addition", () => {
	it("9test rules related to addition", () => {
		expect(selectively.parseExpression("5 + 6 * 7 + 5").toString()).toEqual("5 + 6 * 7 + 5")
		expect(selectively.parseExpression("5 + 6 * 7 + 5 * 8").toString()).toEqual("5 + 6 * 7 + 5 * 8")
		expect(selectively.parseExpression("5 + 6 * 7 + 5").evaluate()).toEqual(52)
		expect(selectively.parseExpression("a + 6 * 7 + 5").evaluate({ a: 5 })).toEqual(52)
	})
})
