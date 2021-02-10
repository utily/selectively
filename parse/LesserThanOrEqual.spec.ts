import * as selectively from "../index"

describe("parse.LesserThanOrEqual", () => {
	it("test LesserThanOrEqual parse quick", () => {
		expect(selectively.parse("$testA<=$testB").is({ testC: 700, testB: 200, testA: 150 })).toBeTruthy()
		expect(selectively.parse("$testA<=$testB").is({ testC: 700, testB: 150, testA: 200 })).toBeFalsy()

		expect(selectively.parse("$testA<=$testB").is({ testC: 700, testB: 200, testA: [150] })).toBeTruthy()
		expect(selectively.parse("$testA<=$testB").is({ testC: 700, testB: 200, testA: [400] })).toBeFalsy()

		expect(selectively.parse("$testA<=$testB").is({ testC: 700, testB: 200, nested: { testA: 150 } })).toBeTruthy()
		expect(selectively.parse("$testA<=$testB").is({ testC: 700, testB: 200, nested: { testA: 400 } })).toBeFalsy()

		expect(selectively.parse("$testA<=$testB").is({ testC: 700, testB: 200, nested: { testA: [150] } })).toBeTruthy()
		expect(selectively.parse("$testA<=$testB").is({ testC: 700, testB: 200, nested: { testA: [400] } })).toBeFalsy()

		expect(selectively.parse("200<=150").is(undefined)).toBeFalsy()
		expect(selectively.parse("$testA<=150").is(200)).toBeFalsy()
		expect(selectively.parse("200<=$testB").is(150)).toBeFalsy()
		expect(selectively.parse("$testA<=$testB").is([200, 150])).toBeFalsy()

		expect(selectively.parse("400<=400").is(undefined)).toBeTruthy()
		expect(selectively.parse("400<=$testB").is(400)).toBeTruthy()
		expect(selectively.parse("$testA<=400").is(400)).toBeTruthy()
		expect(selectively.parse("$testA<=$testB").is([400, 400])).toBeTruthy()
	})

	it("test LesserThanOrEqual parse only $", () => {
		expect(selectively.parse("150<=200").is(undefined)).toBeTruthy()
		expect(selectively.parse("$<=200").is(150)).toBeTruthy()
		expect(selectively.parse("150<=$").is(200)).toBeTruthy()
		expect(selectively.parse("$<=$").is([150, 200])).toBeTruthy()
		expect(selectively.parse("$<=$").is([150, 200])).toBeTruthy()

		expect(selectively.parse("200<=150").is(undefined)).toBeFalsy()
		expect(selectively.parse("$<=150").is(200)).toBeFalsy()
		expect(selectively.parse("200<=$").is(150)).toBeFalsy()
		expect(selectively.parse("$<=$").is([200, 150])).toBeFalsy()
		expect(selectively.parse("$<=$").is([200, 150])).toBeFalsy()
	})
})
