import * as selectively from "./index"

describe("not", () => {
	it("simple", () => expect(selectively.is({ class: selectively.not("test") }, { id: "axb", class: "test2" })).toBeTruthy())
	it("false", () => expect(selectively.is({ class: selectively.not("test") }, { id: "axb", class: "test" })).toBeFalsy())
})
