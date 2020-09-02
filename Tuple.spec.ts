import * as selectively from "./index"

describe("Tuple", () => {
	it("simple", () =>
		expect(
			selectively.is([{ class: selectively.not("test") }, 1337], [{ id: "axb", class: "test2" }, 1337])
		).toBeTruthy())
})
