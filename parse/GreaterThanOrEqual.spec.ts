import * as selectively from "../index"

describe("parse.GreaterThanOrEqual", () => {
	it("test GreaterThanOrEqual parse", () => {
		expect(selectively.parse("test:>=200")).toMatchObject(
			selectively.property("test", selectively.greaterThanOrEqual("200"))
		)
	})
})
