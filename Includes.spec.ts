import * as selectively from "./index"

describe("includes", () => {
	it("simple", () =>
		expect(selectively.is({ class: selectively.includes("test") }, { id: "axb", class: "3test2" })).toBeTruthy())
})
