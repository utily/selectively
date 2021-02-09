import * as selectively from "../index"

describe("parse.LesserThan", () => {
	it("test LesserThan parse", () => {
		expect(selectively.parse("test:<200")).toMatchObject(selectively.property("test", selectively.lesserThan("200")))
	})
})
