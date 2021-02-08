import * as selectively from "../index"

describe("parse.LesserThanOrEqual", () => {
	it("test LesserThanOrEqual parse", () => {
		expect(selectively.parse("test:<=200")).toMatchObject(
			selectively.property("test", selectively.lesserThanOrEqual("200"))
		)
	})
})
