import * as selectively from "./index"

describe("FunctionCall test", () => {
	it("simple", () => {
		const parsed = selectively.parse("test(a, b, c)")
		expect(parsed.toString()).toEqual("test(a, b, c)")
	})
})
