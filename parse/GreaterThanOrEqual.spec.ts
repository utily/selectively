import * as selectively from "../index"

describe("parse.GreaterThanOrEqual", () => {
	it("test GreaterThanOrEqual parse quick", () => {
		expect(selectively.parse("$testA>=$testB").is({ testC: 700, testB: 200, testA: 300 })).toBeTruthy()
		expect(selectively.parse("$testA>=$testB").is({ testC: 700, testB: 300, testA: 200 })).toBeFalsy()

		expect(selectively.parse("$testA>=$testB").is({ testC: 700, testB: 200, testA: [300] })).toBeTruthy()
		expect(selectively.parse("$testA>=$testB").is({ testC: 700, testB: 200, testA: [100] })).toBeFalsy()

		expect(selectively.parse("$testA>=$testB").is({ testC: 700, testB: 200, nested: { testA: 300 } })).toBeTruthy()
		expect(selectively.parse("$testA>=$testB").is({ testC: 700, testB: 200, nested: { testA: 100 } })).toBeFalsy()

		expect(selectively.parse("$testA>=$testB").is({ testC: 700, testB: 200, nested: { testA: [300] } })).toBeTruthy()
		expect(selectively.parse("$testA>=$testB").is({ testC: 700, testB: 200, nested: { testA: [100] } })).toBeFalsy()

		expect(selectively.parse("200>=300").is(undefined)).toBeFalsy()
		expect(selectively.parse("$testA>=300").is(200)).toBeFalsy()
		expect(selectively.parse("200>=$testB").is(300)).toBeFalsy()
		expect(selectively.parse("$testA>=$testB").is([200, 300])).toBeFalsy()

		expect(selectively.parse("100>=100").is(undefined)).toBeTruthy()
		expect(selectively.parse("100>=$testB").is(100)).toBeTruthy()
		expect(selectively.parse("$testA>=100").is(100)).toBeTruthy()
		expect(selectively.parse("$testA>=$testB").is([100, 100])).toBeTruthy()
	})

	it("test GreaterThanOrEqual parse only $", () => {
		expect(selectively.parse("300>=200").is(undefined)).toBeTruthy()
		expect(selectively.parse("$>=200").is(300)).toBeTruthy()
		expect(selectively.parse("300>=$").is(200)).toBeTruthy()
		expect(selectively.parse("$>=$").is([300, 200])).toBeTruthy()
		expect(selectively.parse("$>=$").is([300, 200])).toBeTruthy()

		expect(selectively.parse("200>=300").is(undefined)).toBeFalsy()
		expect(selectively.parse("$>=300").is(200)).toBeFalsy()
		expect(selectively.parse("200>=$").is(300)).toBeFalsy()
		expect(selectively.parse("$>=$").is([200, 300])).toBeFalsy()
		expect(selectively.parse("$>=$").is([200, 300])).toBeFalsy()
	})
})
