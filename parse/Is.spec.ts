import * as selectively from "../index"

describe("parse.Is", () => {
	it("is", () => expect(selectively.parse("testA")).toMatchObject(selectively.is("testA")))
	it("is * 3", () =>
		expect(selectively.parse("testA testB testC")).toMatchObject(
			selectively.and(selectively.is("testA"), selectively.is("testB"), selectively.is("testC"))
		))
	it("expression.is", () => {
		expect(selectively.parse("test:1 + 1").is({ test: 2 })).toBeTruthy()
		expect(selectively.parse("test:1 + 2").is({ test: 2 })).toBeFalsy()
	})
})
