import * as selectively from "../index"

describe("parse.Multiplication", () => {
	it("multiplication parsing", () => {
		expect(selectively.parseExpression("5 * 6 * 7").toString()).toEqual("5 * 6 * 7")
		expect(selectively.parseExpression("5 * 6 + 7").toString()).toEqual("5 * 6 + 7")
	})
})
