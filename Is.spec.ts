import * as selectively from "./index"

describe("is", () => {
	it("simple", () => expect(selectively.is({ class: "test" }, { id: "axb", class: "test" })).toBeTruthy())
	it("not", () => expect(selectively.is({ class: "test" }, { id: "axb", class: "test2" })).toBeFalsy())
	it("deep", () =>
		expect(
			selectively.is({ class: { name: "test" } }, { id: "axb", class: { name: "test", type: "type" } })
		).toBeTruthy())
})
describe("filter", () => {
	it("simple.filter", () =>
		expect(
			selectively.filter({ class: "test" }, [
				{ id: "axb", class: "test" },
				{ id: "axc", class: "test2" },
			])
		).toEqual([{ id: "axb", class: "test" }]))
})
