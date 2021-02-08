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
		expect(selectively.is({ class: selectively.lesserThan("300.0") }, { id: "axb", class: "300" })).toBeTruthy()
		expect(selectively.is({ class: selectively.lesserThan("300.0") }, { id: "axb", class: 300 })).toBeFalsy()
		expect(selectively.is({ class: selectively.lesserThan(300.0) }, { id: "axb", class: "300" })).toBeFalsy()
		expect(selectively.is({ class: selectively.lesserThan(300.0) }, { id: "axb", class: 300 })).toBeFalsy()
	})
})
