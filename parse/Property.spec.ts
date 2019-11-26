import * as selectively from "../index"

describe("parse.Property", () => {
	it("single", () => expect(selectively.parse("property:test")).toMatchObject(selectively.property("property", selectively.is("test"))))
	it("nested", () => expect(selectively.parse("nested.property:test")).toMatchObject(selectively.property("nested", selectively.property("property", selectively.is("test")))))
})
