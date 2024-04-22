import { selectively } from "./index"

describe("Contains", () => {
	it("simple 1", () =>
		expect(
			selectively.is({ status: selectively.contains(["approved"]) }, { id: "axb", status: ["denied", "approved"] })
		).toBeTruthy())
	it("simple 2", () => {
		const status = selectively.contains(["approved", "accepted"])
		console.log("simple 2: ", status.toString())

		expect(selectively.is({ status }, { id: "axb", status: ["accepted", "approved"] })).toBeTruthy()
	})
	it("negative", () =>
		expect(
			selectively.is({ status: selectively.contains(["approved"]) }, { id: "axb", status: ["denied", "returned"] })
		).toBeFalsy())
	it("basic 1", () => {
		expect(selectively.contains(["aaa"], ["aaa", "ddd", "ggg"])).toEqual(true)
	})
	it("basic 2", () => {
		expect(selectively.contains(["aaa", "ddd"], ["aaa", "ddd", "ggg"])).toEqual(true)
	})
	it("basic 3", () => {
		expect(selectively.contains(["aaa", "bbb", "ccc"], ["aaa", "ddd", "ggg"])).toEqual(false)
	})
	it("numbers 1", () => {
		expect(selectively.contains([5], ["aaa", "ddd", "ggg"])).toEqual(false)
	})
	it("numbers 2", () => {
		expect(selectively.contains([5], [5, 6, 7])).toEqual(true)
	})
	it("numbers 3", () => {
		expect(selectively.contains([5, 7.3], [5, 6, 7.3])).toEqual(true)
	})
})
