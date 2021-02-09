import * as selectively from "../index"

describe("parse.GreaterThan", () => {
	it("test GreaterThan parse", () => {
		expect(selectively.parse("test:>200")).toMatchObject(selectively.property("test", selectively.greaterThan("200")))
	})
})
