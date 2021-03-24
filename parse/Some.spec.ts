import * as selectively from "../index"

describe("parse.Some", () => {
	it("some(charged | ordered)", () =>
		expect(selectively.parse("value:some(charged | ordered)")).toMatchObject(
			selectively.property("value", selectively.some(selectively.or("charged", "ordered")))
		))
})
