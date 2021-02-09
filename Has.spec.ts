import * as selectively from "./index"

describe("has", () => {
	it("simple", () => expect(selectively.has("class", { id: "axb", class: "test" })).toBeTruthy())
	it("not", () => expect(selectively.has("class", { id: "axb", class2: "test" })).toBeFalsy())
	it("deep", () => {
		expect(selectively.has("class.name1", { id: "axb", class: { name1: "test", type: "type" } })).toBeTruthy()
		expect(selectively.has("class.name1", { id: "axb", class2: { name1: "test", type: "type" } })).toBeFalsy()
		expect(selectively.has("name1", { id: "axb", class: { name1: "test", type: "type" } })).toBeTruthy()
		expect(selectively.has("name1", { id: "axb", class: { name2: "test", type: "type" } })).toBeFalsy()
	})
})
describe("filter", () => {
	it("simple", () =>
		expect(
			selectively.parse("has(class)").filter([
				{ id: "axb", class: "test" },
				{ id: "axc", class2: "test" },
			])
		).toEqual([{ id: "axb", class: "test" }]))
})
