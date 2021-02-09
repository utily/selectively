import * as selectively from "../index"

describe("parse.Has", () => {
	it("test Has parse", () => {
		expect(selectively.parse("has(test)")).toMatchObject(selectively.has("test"))
	})
})
