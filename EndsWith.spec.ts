import * as selectively from "./index"

describe("endsWith", () => {
	it("simple", () =>
		expect(selectively.is({ class: selectively.endsWith("st2") }, { id: "axb", class: "test2" })).toBeTruthy())
})
