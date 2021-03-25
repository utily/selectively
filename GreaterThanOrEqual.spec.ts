import * as selectively from "./index"

describe("greater than or equal", () => {
	it("greater than or equal integers", () => {
		expect(selectively.is({ class: selectively.greaterThanOrEqual("300") }, { id: "axb", class: "290" })).toBeFalsy()
		expect(selectively.is({ class: selectively.greaterThanOrEqual("300") }, { id: "axb", class: "310" })).toBeTruthy()
		expect(selectively.is({ class: selectively.greaterThanOrEqual(300) }, { id: "axb", class: "290" })).toBeFalsy()
		expect(selectively.is({ class: selectively.greaterThanOrEqual(300) }, { id: "axb", class: "310" })).toBeTruthy()
		expect(selectively.is({ class: selectively.greaterThanOrEqual("300") }, { id: "axb", class: 290 })).toBeFalsy()
		expect(selectively.is({ class: selectively.greaterThanOrEqual("300") }, { id: "axb", class: 310 })).toBeTruthy()
		expect(selectively.is({ class: selectively.greaterThanOrEqual(300) }, { id: "axb", class: 290 })).toBeFalsy()
		expect(selectively.is({ class: selectively.greaterThanOrEqual(300) }, { id: "axb", class: 310 })).toBeTruthy()
	})
	it("greater than or equal decimals", () => {
		expect(
			selectively.is({ class: selectively.greaterThanOrEqual("300.1") }, { id: "axb", class: "300.01" })
		).toBeFalsy()
		expect(
			selectively.is({ class: selectively.greaterThanOrEqual("300.1") }, { id: "axb", class: "300.11" })
		).toBeTruthy()
		expect(selectively.is({ class: selectively.greaterThanOrEqual(300.1) }, { id: "axb", class: "300.01" })).toBeFalsy()
		expect(
			selectively.is({ class: selectively.greaterThanOrEqual(300.1) }, { id: "axb", class: "300.11" })
		).toBeTruthy()
		expect(selectively.is({ class: selectively.greaterThanOrEqual("300.1") }, { id: "axb", class: 300.01 })).toBeFalsy()
		expect(
			selectively.is({ class: selectively.greaterThanOrEqual("300.1") }, { id: "axb", class: 300.11 })
		).toBeTruthy()
		expect(selectively.is({ class: selectively.greaterThanOrEqual(300.1) }, { id: "axb", class: 300.01 })).toBeFalsy()
		expect(selectively.is({ class: selectively.greaterThanOrEqual(300.1) }, { id: "axb", class: 300.11 })).toBeTruthy()
	})
	it("greater than when equal", () => {
		expect(selectively.is({ class: selectively.greaterThanOrEqual("300") }, { id: "axb", class: "300.0" })).toBeTruthy()
		expect(selectively.is({ class: selectively.greaterThanOrEqual("300") }, { id: "axb", class: 300.0 })).toBeTruthy()
		expect(selectively.is({ class: selectively.greaterThanOrEqual(300) }, { id: "axb", class: "300.0" })).toBeTruthy()
		expect(selectively.is({ class: selectively.greaterThanOrEqual(300) }, { id: "axb", class: 300.0 })).toBeTruthy()
		expect(selectively.is({ class: selectively.greaterThanOrEqual("300.0") }, { id: "axb", class: "300" })).toBeTruthy()
		expect(selectively.is({ class: selectively.greaterThanOrEqual("300.0") }, { id: "axb", class: 300 })).toBeTruthy()
		expect(selectively.is({ class: selectively.greaterThanOrEqual(300.0) }, { id: "axb", class: "300" })).toBeTruthy()
		expect(selectively.is({ class: selectively.greaterThanOrEqual(300.0) }, { id: "axb", class: 300 })).toBeTruthy()
	})
	it("greater than toString", () => {
		const asText = "verification.amount>=5"
		expect(selectively.parse(asText)).toEqual(
			selectively.property("verification", selectively.property("amount", selectively.greaterThanOrEqual(5)))
		)
		expect(selectively.parse(asText).toString()).toEqual(asText)
	})
})
