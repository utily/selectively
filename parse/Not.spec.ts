import * as selectively from "../index"

describe("parse.Not", () => {
	it("!test", () => expect(selectively.parse("!test")).toMatchObject(selectively.not(selectively.is("test"))))
	it("!*test*", () => expect(selectively.parse("!*test*")).toMatchObject(selectively.not(selectively.includes("test"))))
})
