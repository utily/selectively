import * as selectively from "./index"

describe("greater than", () => {
	it("greater than integers", () => {
		expect(selectively.is({ class: selectively.greaterThan("300") }, { id: "axb", class: "290" })).toBeFalsy()
		expect(selectively.is({ class: selectively.greaterThan("300") }, { id: "axb", class: "310" })).toBeTruthy()
		expect(selectively.is({ class: selectively.greaterThan(300) }, { id: "axb", class: "290" })).toBeFalsy()
		expect(selectively.is({ class: selectively.greaterThan(300) }, { id: "axb", class: "310" })).toBeTruthy()
		expect(selectively.is({ class: selectively.greaterThan("300") }, { id: "axb", class: 290 })).toBeFalsy()
		expect(selectively.is({ class: selectively.greaterThan("300") }, { id: "axb", class: 310 })).toBeTruthy()
		expect(selectively.is({ class: selectively.greaterThan(300) }, { id: "axb", class: 290 })).toBeFalsy()
		expect(selectively.is({ class: selectively.greaterThan(300) }, { id: "axb", class: 310 })).toBeTruthy()
	})
	it("greater than decimals", () => {
		expect(selectively.is({ class: selectively.greaterThan("300.1") }, { id: "axb", class: "300.01" })).toBeFalsy()
		expect(selectively.is({ class: selectively.greaterThan("300.1") }, { id: "axb", class: "300.11" })).toBeTruthy()
		expect(selectively.is({ class: selectively.greaterThan(300.1) }, { id: "axb", class: "300.01" })).toBeFalsy()
		expect(selectively.is({ class: selectively.greaterThan(300.1) }, { id: "axb", class: "300.11" })).toBeTruthy()
		expect(selectively.is({ class: selectively.greaterThan("300.1") }, { id: "axb", class: 300.01 })).toBeFalsy()
		expect(selectively.is({ class: selectively.greaterThan("300.1") }, { id: "axb", class: 300.11 })).toBeTruthy()
		expect(selectively.is({ class: selectively.greaterThan(300.1) }, { id: "axb", class: 300.01 })).toBeFalsy()
		expect(selectively.is({ class: selectively.greaterThan(300.1) }, { id: "axb", class: 300.11 })).toBeTruthy()
	})
	it("greater than when equal", () => {
		expect(selectively.is({ class: selectively.greaterThan("300") }, { id: "axb", class: "300.0" })).toBeFalsy()
		expect(selectively.is({ class: selectively.greaterThan("300") }, { id: "axb", class: 300.0 })).toBeFalsy()
		expect(selectively.is({ class: selectively.greaterThan(300) }, { id: "axb", class: "300.0" })).toBeFalsy()
		expect(selectively.is({ class: selectively.greaterThan(300) }, { id: "axb", class: 300.0 })).toBeFalsy()
		expect(selectively.is({ class: selectively.greaterThan("300.0") }, { id: "axb", class: "300" })).toBeFalsy()
		expect(selectively.is({ class: selectively.greaterThan("300.0") }, { id: "axb", class: 300 })).toBeFalsy()
		expect(selectively.is({ class: selectively.greaterThan(300.0) }, { id: "axb", class: "300" })).toBeFalsy()
		expect(selectively.is({ class: selectively.greaterThan(300.0) }, { id: "axb", class: 300 })).toBeFalsy()
	})
	it("greater than toString", () => {
		const asText = "verification.amount>5"
		expect(selectively.parse(asText)).toEqual(
			selectively.property("verification", selectively.property("amount", selectively.greaterThan(5)))
		)
		expect(selectively.parse(asText).toString()).toEqual(asText)
	})
})
