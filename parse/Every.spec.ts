import * as selectively from "../index"

describe("parse.Every", () => {
	it("every(charged | ordered)", () =>
		expect(selectively.parse("value:every(charged | ordered)")).toMatchObject(
			selectively.property("value", selectively.every(selectively.or("charged", "ordered")))
		))
	it("every(*ed)", () =>
		expect(
			selectively.is(selectively.parse("status:every(*ed)"), { id: "axb", status: ["denied", "approved"] })
		).toBeTruthy())
})
