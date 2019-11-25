import * as selectively from "../index"

describe("parse.Includes", () => {
	it("includes", () => expect(selectively.parse("*test*")).toMatchObject(selectively.includes("test")))
})
