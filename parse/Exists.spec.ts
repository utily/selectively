import * as selectively from "../index"

describe("parse.Exists", () => {
	it("test Exists parse", () => {
		expect(selectively.parse("exists(test)")).toMatchObject(selectively.exists("test"))
	})
})
