import * as selectively from "../index"

describe("parse.Some", () => {
	it("some(charged | ordered)", () =>
		expect(selectively.parse("value:some(charged | ordered)")).toMatchObject(
			selectively.property("value", selectively.some(selectively.or("charged", "ordered")))
		))
	it("simple", () => {
		expect(selectively.parse(":some(value)")).toMatchObject(selectively.some("value"))
		expect(selectively.is(selectively.parse(":some(value)"), ["not value", "value", "other"])).toEqual(true)
		expect(selectively.is(selectively.parse(":some(1)"), [1, "not value", "value", "other"])).toEqual(true)
		expect(selectively.is(selectively.parse(":some(1)"), [2, "not value", "value", "other"])).toEqual(false)
		expect(selectively.is(selectively.parse(":some(value)"), ["other word", "3rd word", "other"])).toEqual(false)
	})
})
