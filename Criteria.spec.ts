import { selectively } from "./index"

describe("Criteria", () => {
	it("isCriteria", () => {
		expect(selectively.Criteria.is("asd")).toEqual(true)
		expect(selectively.Criteria.is(123)).toEqual(true)
		expect(selectively.Criteria.is(selectively.parse("foo:bar"))).toEqual(true)
		expect(selectively.Criteria.is({ prop: "value" }, true)).toEqual(true)
		expect(selectively.Criteria.is({ prop: { prop: "value" } }, true)).toEqual(true)
		expect(selectively.Criteria.is({ prop: { prop: ["value", selectively.parse("value")] } }, true)).toEqual(true)
		expect(selectively.Criteria.is(true)).toEqual(false)
		expect(selectively.Criteria.is({ prop: { prop: ["value", false] } })).toEqual(false)
	})
})
