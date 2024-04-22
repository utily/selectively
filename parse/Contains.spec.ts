import { selectively } from "../index"

describe("parse.Contains", () => {
	it("contains(charged, ordered)", () =>
		expect(selectively.parse("value:contains(charged, ordered)")).toMatchObject(
			selectively.property("value", selectively.contains(["charged", "ordered"]))
		))
	it("simple", () => {
		expect(selectively.parse(":contains(value)")).toMatchObject(selectively.contains(["value"]))
		expect(selectively.is(selectively.parse(":contains(value)"), ["not value", "value", "other"])).toEqual(true)
		expect(selectively.is(selectively.parse(":contains(1)"), [1, "not value", "value", "other"])).toEqual(true)
		expect(selectively.is(selectively.parse(":contains(1)"), [2, "not value", "value", "other"])).toEqual(false)
		expect(selectively.is(selectively.parse(":contains(value)"), ["other word", "3rd word", "other"])).toEqual(false)
	})
	it("simple", () => {
		expect(selectively.parse(":contains(test, other)").toString()).toEqual("contains(test, other)")
		expect(selectively.parse(":contains(test, other)")).toEqual({
			class: "Contains",
			precedence: 85,
			criteria: ["test", "other"],
		})
	})
	it("contains(charged, ordered)", () => {
		const a = { values: ["aaa", "bbb"] }
		const parsed = selectively.parse("values:contains(aaa, bbb)")
		console.log("within parsed: ", parsed)
		expect(selectively.is(parsed, a)).toEqual(true)
	})
})
