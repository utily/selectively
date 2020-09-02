import * as selectively from "./index"

describe("some", () => {
	it("simple", () =>
		expect(
			selectively.is({ status: selectively.some("approved") }, { id: "axb", status: ["denied", "approved"] })
		).toBeTruthy())
	it("negative", () =>
		expect(
			selectively.is({ status: selectively.some("approved") }, { id: "axb", status: ["denied", "returned"] })
		).toBeFalsy())
})
