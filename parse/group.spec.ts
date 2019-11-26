import * as selectively from "../index"

describe("parse.group", () => {
	it("!(test | testing)", () => expect(selectively.parse("!(test | testing)")).toMatchObject(selectively.not(selectively.or("test", "testing"))))
	it("!(test (testing* | *failing))", () => expect(selectively.parse("!(test (testing* | *failing))")).toMatchObject(selectively.not(selectively.and("test", selectively.or(selectively.startsWith("testing"), selectively.endsWith("failing"))))))
})
