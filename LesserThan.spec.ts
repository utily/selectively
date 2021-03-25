import * as selectively from "./index"

describe("lesser than", () => {
	it("lesser than integers", () => {
		expect(selectively.is({ class: selectively.lesserThan("300") }, { id: "axb", class: "290" })).toBeTruthy()
		expect(selectively.is({ class: selectively.lesserThan("300") }, { id: "axb", class: "310" })).toBeFalsy()
		expect(selectively.is({ class: selectively.lesserThan(300) }, { id: "axb", class: "290" })).toBeTruthy()
		expect(selectively.is({ class: selectively.lesserThan(300) }, { id: "axb", class: "310" })).toBeFalsy()
		expect(selectively.is({ class: selectively.lesserThan("300") }, { id: "axb", class: 290 })).toBeTruthy()
		expect(selectively.is({ class: selectively.lesserThan("300") }, { id: "axb", class: 310 })).toBeFalsy()
		expect(selectively.is({ class: selectively.lesserThan(300) }, { id: "axb", class: 290 })).toBeTruthy()
		expect(selectively.is({ class: selectively.lesserThan(300) }, { id: "axb", class: 310 })).toBeFalsy()
	})
	it("lesser than decimals", () => {
		expect(selectively.is({ class: selectively.lesserThan("300.1") }, { id: "axb", class: "300.01" })).toBeTruthy()
		expect(selectively.is({ class: selectively.lesserThan("300.1") }, { id: "axb", class: "300.11" })).toBeFalsy()
		expect(selectively.is({ class: selectively.lesserThan(300.1) }, { id: "axb", class: "300.01" })).toBeTruthy()
		expect(selectively.is({ class: selectively.lesserThan(300.1) }, { id: "axb", class: "300.11" })).toBeFalsy()
		expect(selectively.is({ class: selectively.lesserThan("300.1") }, { id: "axb", class: 300.01 })).toBeTruthy()
		expect(selectively.is({ class: selectively.lesserThan("300.1") }, { id: "axb", class: 300.11 })).toBeFalsy()
		expect(selectively.is({ class: selectively.lesserThan(300.1) }, { id: "axb", class: 300.01 })).toBeTruthy()
		expect(selectively.is({ class: selectively.lesserThan(300.1) }, { id: "axb", class: 300.11 })).toBeFalsy()
	})
	it("lesser than when equal", () => {
		expect(selectively.is({ class: selectively.lesserThan("300") }, { id: "axb", class: "300.0" })).toBeFalsy()
		expect(selectively.is({ class: selectively.lesserThan("300") }, { id: "axb", class: 300.0 })).toBeFalsy()
		expect(selectively.is({ class: selectively.lesserThan(300) }, { id: "axb", class: "300.0" })).toBeFalsy()
		expect(selectively.is({ class: selectively.lesserThan(300) }, { id: "axb", class: 300.0 })).toBeFalsy()
		expect(selectively.is({ class: selectively.lesserThan("300.0") }, { id: "axb", class: "300" })).toBeFalsy()
		expect(selectively.is({ class: selectively.lesserThan("300.0") }, { id: "axb", class: 300 })).toBeFalsy()
		expect(selectively.is({ class: selectively.lesserThan(300.0) }, { id: "axb", class: "300" })).toBeFalsy()
		expect(selectively.is({ class: selectively.lesserThan(300.0) }, { id: "axb", class: 300 })).toBeFalsy()
	})

	it("iso-dates compare", () => {
		expect(
			selectively.is({ class: selectively.lesserThan("2021-02-27") }, { id: "axb", class: "2021-03-01" })
		).toBeFalsy()
	})
	it("greater than toString", () => {
		const asText = "verification.amount<5"
		expect(selectively.parse(asText)).toEqual(
			selectively.property("verification", selectively.property("amount", selectively.lesserThan("5")))
		)
		expect(selectively.parse(asText).toString()).toEqual(asText)
	})
})
