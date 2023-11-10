import * as selectively from "./index"

describe("Filter", () => {
	it("!(authorization.number:filterThis)", () => {
		const parsed = selectively.parse("!(authorization.number:filterThis)")
		expect(parsed.toString()).toEqual("!(authorization.number:filterThis)")
		const object = [{ authorization: { number: "filterThis" } }, { authorization: { number: "doNotFilterThis" } }]
		expect(parsed.filter(object)).toEqual([{ authorization: { number: "doNotFilterThis" } }])
	})
	it('!(user.email:"adam@example.com")', () => {
		const parsed = selectively.parse('!(user.email:"adam@example.com")')
		expect(parsed.toString()).toEqual('!(user.email:"adam@example.com")')
		const object = [{ user: { email: "adam@example.com" } }, { user: { email: "doNotadam" } }]
		expect(parsed.filter(object)).toEqual([{ user: { email: "doNotadam" } }])
	})
})
