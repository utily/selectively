import * as selectively from "../index"

describe("parse.Addition", () => {
	it("9test rules related to addition", () => {
		const expression = new selectively.Addition(
			new selectively.Value("5"),
			new selectively.Addition(
				new selectively.Multiplication(new selectively.Value("6"), new selectively.Value("7")),
				new selectively.Value("5")
			)
		)
		expect(selectively.parse("amount<5 + 6 * 7 + 5")).toEqual(
			new selectively.Property("amount", new selectively.LesserThan(expression))
		)
		expect(selectively.parse("amount + 6 + 7 + 5").toString()).toEqual("amount + 6 + 7 + 5")
		expect(selectively.parse("amount<test.nested + 6").toString()).toEqual("amount<test.nested + 6")
		expect(selectively.parse("amount<test + 6 * 7 + 5").toString()).toEqual("amount<test + 6 * 7 + 5")
		expect(selectively.parse("amount<test + 5 amount<test + 5").toString()).toEqual("amount<test + 5 amount<test + 5")
		expect(selectively.parseExpression("5 + 6 * 7 + 5").toString()).toEqual("5 + 6 * 7 + 5")
		expect(selectively.parseExpression("5 + 6 * 7 + 5 * 8").toString()).toEqual("5 + 6 * 7 + 5 * 8")
		expect(selectively.parseExpression("5 + 6 * 7 + 5").evaluate()).toEqual(52)
		expect(selectively.parseExpression("a + 6 * 7 + 5").evaluate({ a: 5 })).toEqual(52)
	})
})
