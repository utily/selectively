import * as selectively from "./index"

describe("match", () => {
	it("simple", () => expect(selectively.is({ class: selectively.match(/te.+/) }, { id: "axb", class: "test2" })).toBeTruthy())
})
