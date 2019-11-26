import * as selectively from "./index"

describe("and", () => {
	it("simple", () => expect(selectively.is({ class: selectively.and({ name: "test" }, { type: "type" }) }, { id: "axb", class: { name: "test", type: "type" } })).toBeTruthy())
	it("not", () => expect(selectively.is({ class: selectively.and({ name: "test" }, { type: "type" }) }, { id: "axb", class: { name: "test", type: "type2" } })).toBeFalsy())
	it("toString empty", () => expect(selectively.and().toString()).toEqual(""))
})
