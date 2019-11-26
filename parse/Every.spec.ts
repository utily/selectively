import * as selectively from "../index"

describe("parse.Every", () => {
	it("every(charged | ordered)", () => expect(selectively.parse("every(charged | ordered)")).toMatchObject(selectively.every(selectively.or("charged", "ordered"))))
})
