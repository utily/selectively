import * as selectively from "./index"

describe("startsWith", () => {
	it("simple", () => expect(selectively.is({ class: selectively.startsWith("test") }, { id: "axb", class: "test2" })).toBeTruthy())
})
