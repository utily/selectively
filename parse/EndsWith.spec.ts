import * as selectively from "../index"

describe("parse.EndsWith", () => {
	it("endsWith", () => expect(selectively.parse("*test")).toMatchObject(selectively.endsWith("test")))
})
