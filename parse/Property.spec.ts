import * as selectively from "../index"

describe("parse.Property", () => {
	it("nested", () =>
		expect(selectively.parse("(wallet.money:test)")).toMatchObject(
			selectively.property("wallet", selectively.property("money", selectively.is("test")))
		))
})
