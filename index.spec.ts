import * as selectively from "./index"

describe("Filter", () => {
	it("!(authorization.number:filterThis)", () => {
		const parsed = selectively.parse("!(authorization.number:filterThis)")
		expect(parsed.toString()).toEqual("!(authorization.number:filterThis)")
		const object = [{ authorization: { number: "filterThis" } }, { authorization: { number: "doNotFilterThis" } }]
		expect(parsed.filter(object)).toEqual([{ authorization: { number: "doNotFilterThis" } }])
	})
})
