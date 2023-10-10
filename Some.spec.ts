import * as selectively from "./index"

describe("some", () => {
	it("simple", () =>
		expect(
			selectively.is({ status: selectively.some("approved") }, { id: "axb", status: ["denied", "approved"] })
		).toBeTruthy())
	it("negative", () =>
		expect(
			selectively.is({ status: selectively.some("approved") }, { id: "axb", status: ["denied", "returned"] })
		).toBeFalsy())
	it("other", () => {
		expect(selectively.is(selectively.some("value"), ["value", "not value", "3rd array item"])).toEqual(true)
		expect(selectively.is(selectively.some("not value"), ["value", "not value", "3rd array item"])).toEqual(true)
		expect(selectively.is(selectively.some("cant find"), ["value", "not value", "3rd array item"])).toEqual(false)
		expect(selectively.some("value", ["value", "not value", "3rd array item"])).toEqual(true)
		expect(selectively.some("cant find", ["value", "not value", "3rd array item"])).toEqual(false)
	})
})
