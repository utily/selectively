import * as selectively from "./index"

describe("selectively.Value", () => {
	it("Evaluating number", () => {
		expect(new selectively.Value(5).evaluate()).toEqual(5)
		expect(new selectively.Value(2.5).evaluate()).toEqual(2.5)
		expect(new selectively.Value(-3).evaluate()).toEqual(-3)
	})
	it("2Evaluating string", () => {
		expect(new selectively.Value("5").evaluate()).toEqual(5)
		expect(new selectively.Value("2,5").evaluate()).toEqual(2.5)
		expect(new selectively.Value("-3").evaluate()).toEqual(-3)
	})
})
