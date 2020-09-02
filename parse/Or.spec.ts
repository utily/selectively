import * as selectively from "../index"

describe("parse.Or", () => {
	it("test | testing", () =>
		expect(selectively.parse("test | testing")).toMatchObject(selectively.or("test", "testing")))
})
