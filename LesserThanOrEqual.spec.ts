import * as selectively from "./index"

describe("lesser than or equal", () => {
	it("lesser than or equal integers", () => {
		expect(selectively.is({ class: selectively.lesserThanOrEqual("300") }, { id: "axb", class: "290" })).toBeTruthy()
		expect(selectively.is({ class: selectively.lesserThanOrEqual("300") }, { id: "axb", class: "310" })).toBeFalsy()
		expect(selectively.is({ class: selectively.lesserThanOrEqual(300) }, { id: "axb", class: "290" })).toBeTruthy()
		expect(selectively.is({ class: selectively.lesserThanOrEqual(300) }, { id: "axb", class: "310" })).toBeFalsy()
		expect(selectively.is({ class: selectively.lesserThanOrEqual("300") }, { id: "axb", class: 290 })).toBeTruthy()
		expect(selectively.is({ class: selectively.lesserThanOrEqual("300") }, { id: "axb", class: 310 })).toBeFalsy()
		expect(selectively.is({ class: selectively.lesserThanOrEqual(300) }, { id: "axb", class: 290 })).toBeTruthy()
		expect(selectively.is({ class: selectively.lesserThanOrEqual(300) }, { id: "axb", class: 310 })).toBeFalsy()
	})
	it("lesser than or equal decimals", () => {
		expect(
			selectively.is({ class: selectively.lesserThanOrEqual("300.1") }, { id: "axb", class: "300.01" })
		).toBeTruthy()
		expect(
			selectively.is({ class: selectively.lesserThanOrEqual("300.1") }, { id: "axb", class: "300.11" })
		).toBeFalsy()
		expect(selectively.is({ class: selectively.lesserThanOrEqual(300.1) }, { id: "axb", class: "300.01" })).toBeTruthy()
		expect(selectively.is({ class: selectively.lesserThanOrEqual(300.1) }, { id: "axb", class: "300.11" })).toBeFalsy()
		expect(selectively.is({ class: selectively.lesserThanOrEqual("300.1") }, { id: "axb", class: 300.01 })).toBeTruthy()
		expect(selectively.is({ class: selectively.lesserThanOrEqual("300.1") }, { id: "axb", class: 300.11 })).toBeFalsy()
		expect(selectively.is({ class: selectively.lesserThanOrEqual(300.1) }, { id: "axb", class: 300.01 })).toBeTruthy()
		expect(selectively.is({ class: selectively.lesserThanOrEqual(300.1) }, { id: "axb", class: 300.11 })).toBeFalsy()
	})
	it("lesser than when equal", () => {
		expect(selectively.is({ class: selectively.lesserThanOrEqual("300") }, { id: "axb", class: "300.0" })).toBeFalsy()
		expect(selectively.is({ class: selectively.lesserThanOrEqual("300") }, { id: "axb", class: 300.0 })).toBeTruthy()
		expect(selectively.is({ class: selectively.lesserThanOrEqual(300) }, { id: "axb", class: "300.0" })).toBeFalsy()
		expect(selectively.is({ class: selectively.lesserThanOrEqual(300) }, { id: "axb", class: 300.0 })).toBeTruthy()
		expect(selectively.is({ class: selectively.lesserThanOrEqual("300.0") }, { id: "axb", class: "300" })).toBeTruthy()
		expect(selectively.is({ class: selectively.lesserThanOrEqual("300.0") }, { id: "axb", class: 300 })).toBeTruthy()
		expect(selectively.is({ class: selectively.lesserThanOrEqual(300.0) }, { id: "axb", class: "300" })).toBeTruthy()
		expect(selectively.is({ class: selectively.lesserThanOrEqual(300.0) }, { id: "axb", class: 300 })).toBeTruthy()
	})
})
