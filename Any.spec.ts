import * as selectively from "./index"

describe("any", () => {
	it("simple", () => expect(selectively.is(selectively.any("test"), { id: "axb", class: "test" })).toBeTruthy())
	it("deep", () => expect(selectively.is(selectively.any("test"), { id: "axb", class: { name: "test" } })).toBeTruthy())
	it("not", () => expect(selectively.is(selectively.any("test"), { id: "axb", class: { name: "test2" } })).toBeFalsy())
	it("null", () => expect(selectively.is(selectively.any("test"), { id: null, class: { name: "test" } })).toBeTruthy())
})
