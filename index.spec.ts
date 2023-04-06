import * as selectively from "./index"

describe("Filter", () => {
	it("!(authorization.number:filterThis)", () => {
		const parsed = selectively.parse("!(authorization.number:filterThis)")
		expect(parsed.toString()).toEqual("!(authorization.number:filterThis)")
		const object = [{ authorization: { number: "filterThis" } }, { authorization: { number: "doNotFilterThis" } }]
		expect(parsed.filter(object)).toEqual([{ authorization: { number: "doNotFilterThis" } }])
	})
	it("fika", () => {
		const data = [
			{
				seat: { exit: true, wide: true, window: false, toilet: false, position: { deck: 0, row: 22, column: "C" } },
				passenger: { age: "adult" },
			},
			{
				seat: { exit: true, wide: true, window: false, toilet: false, position: { deck: 0, row: 25, column: "B" } },
				passenger: { age: "child" },
			},
			{
				seat: { exit: false, wide: false, window: true, toilet: false, position: { deck: 0, row: 26, column: "A" } },
				passenger: { age: "child" },
			},
		]
		const rule = selectively.parse("passenger.age:child seat.exit:true") as selectively.And
		console.log(JSON.stringify(rule))
		expect(rule.filter(data)).toMatchSnapshot()
	})
})
