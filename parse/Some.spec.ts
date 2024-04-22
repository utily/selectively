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

	it("rule argument", () => {
		expect(
			selectively.is(selectively.parse("people:some(name:bill)"), {
				people: [
					{ name: "bill", color: "blue", age: 5 },
					{ name: "carson", color: "cyan", age: 55 },
					{ name: "agna", color: "argent", age: 555 },
				],
			})
		).toEqual(true)
		expect(
			selectively.is(selectively.parse("people:some(name:olle)"), {
				people: [
					{ name: "bill", color: "blue", age: 5 },
					{ name: "carson", color: "cyan", age: 55 },
					{ name: "agna", color: "argent", age: 555 },
				],
			})
		).toEqual(false)
	})
})
