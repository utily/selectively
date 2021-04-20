import * as selectively from "./index"

describe("selectively.Value", () => {
	it("Evaluating value as number", () => {
		expect(new selectively.Value(5).evaluate()).toEqual(5)
		expect(new selectively.Value(2.5).evaluate()).toEqual(2.5)
		expect(new selectively.Value(-3).evaluate()).toEqual(-3)
	})
	it("Evaluating value as string", () => {
		expect(new selectively.Value("5").evaluate()).toEqual(5)
		expect(new selectively.Value("2,5").evaluate()).toEqual(2.5)
		expect(new selectively.Value("-3").evaluate()).toEqual(-3)
	})
})
