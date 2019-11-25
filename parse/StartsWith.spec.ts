import * as selectively from "../index"

describe("parse.StartsWith", () => {
	it("startsWith", () => expect(selectively.parse("test*")).toMatchObject(selectively.startsWith("test")))
})
