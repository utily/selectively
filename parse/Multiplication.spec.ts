import * as selectively from "../index"

describe("parse.Multiplication", () => {
	it("9test rules related to multiplication", () => {
		expect(selectively.parseExpression("5 * 6 * 7").toString()).toEqual("5 * 6 * 7")
		expect(selectively.parseExpression("5 * 6 + 7").toString()).toEqual("5 * 6 + 7")
	})
})
