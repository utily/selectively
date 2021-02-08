import * as selectively from "./index"

describe("exists", () => {
	it("simple", () => expect(selectively.exists("class", { id: "axb", class: "test" })).toBeTruthy())
	it("not", () => expect(selectively.exists("class", { id: "axb", class2: "test" })).toBeFalsy())
	it("deep", () => {
		expect(selectively.exists("class.name1", { id: "axb", class: { name1: "test", type: "type" } })).toBeTruthy()
		expect(selectively.exists("class.name1", { id: "axb", class2: { name1: "test", type: "type" } })).toBeFalsy()
		expect(selectively.exists("name1", { id: "axb", class: { name1: "test", type: "type" } })).toBeTruthy()
		expect(selectively.exists("name1", { id: "axb", class: { name2: "test", type: "type" } })).toBeFalsy()
	})
})
describe("filter", () => {
	it("simple", () =>
		expect(
			selectively.filter("class", [
				{ id: "axb", class: "test" },
				{ id: "axc", class2: "test" },
			])
		).toEqual([{ id: "axb", class: "test" }]))
})
