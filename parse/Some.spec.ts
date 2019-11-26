import * as selectively from "../index"

describe("parse.Some", () => {
	it("some(charged | ordered)", () => expect(selectively.parse("some(charged | ordered)")).toMatchObject(selectively.some(selectively.or("charged", "ordered"))))
})
