import * as selectively from "./index"

describe("or", () => {
	it("both", () => expect(selectively.is({ class: selectively.or({ name: "test" }, { type: "type" }) }, { id: "axb", class: { name: "test", type: "type" } })).toBeTruthy())
	it("one", () => expect(selectively.is({ class: selectively.or({ name: "test" }, { type: "type" }) }, { id: "axb", class: { name: "test2", type: "type" } })).toBeTruthy())
	it("not", () => expect(selectively.is({ class: selectively.or({ name: "test" }, { type: "type" }) }, { id: "axb", class: { name: "test2", type: "type2" } })).toBeFalsy())
})
