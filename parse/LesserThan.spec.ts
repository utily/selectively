import * as selectively from "../index"

describe("parse.LesserThan", () => {
	it("test LesserThan parse quick", () => {
		expect(
			selectively
				.parse("$amount<$refundable")
				.is({ testC: 700, refund: { amount: 200 }, testA: 150, statistic: { refundable: 140 } })
		).toBeFalsy()
		expect(
			selectively
				.parse("$refundable<$amount")
				.is({ testC: 700, refund: { amount: 200 }, testA: 150, statistic: { refundable: 140 } })
		).toBeTruthy()
		expect(selectively.parse("$testA<$testB").is({ testC: 700, testB: 200, testA: 150 })).toBeTruthy()
		expect(selectively.parse("$testA<$testB").is({ testC: 700, testB: 150, testA: 200 })).toBeFalsy()

		expect(selectively.parse("$testA<$testB").is({ testC: 700, testB: 200, testA: [150] })).toBeTruthy()
		expect(selectively.parse("$testA<$testB").is({ testC: 700, testB: 200, testA: [400] })).toBeFalsy()

		expect(selectively.parse("$testA<$testB").is({ testC: 700, testB: 200, nested: { testA: 150 } })).toBeTruthy()
		expect(selectively.parse("$testA<$testB").is({ testC: 700, testB: 200, nested: { testA: 400 } })).toBeFalsy()

		expect(selectively.parse("$testA<$testB").is({ testC: 700, testB: 200, nested: { testA: [150] } })).toBeTruthy()
		expect(selectively.parse("$testA<$testB").is({ testC: 700, testB: 200, nested: { testA: [400] } })).toBeFalsy()

		expect(selectively.parse("200<150").is(undefined)).toBeFalsy()
		expect(selectively.parse("$testA<150").is(200)).toBeFalsy()
		expect(selectively.parse("200<$testB").is(150)).toBeFalsy()
		expect(selectively.parse("$testA<$testB").is([200, 150])).toBeFalsy()

		expect(selectively.parse("400<400").is(undefined)).toBeFalsy()
		expect(selectively.parse("400<$testB").is(400)).toBeFalsy()
		expect(selectively.parse("$testA<400").is(400)).toBeFalsy()
		expect(selectively.parse("$testA<$testB").is([400, 400])).toBeFalsy()
	})

	it("test LesserThan parse only $", () => {
		expect(selectively.parse("150<200").is(undefined)).toBeTruthy()
		expect(selectively.parse("$<200").is(150)).toBeTruthy()
		expect(selectively.parse("150<$").is(200)).toBeTruthy()
		expect(selectively.parse("$<$").is([150, 200])).toBeTruthy()
		expect(selectively.parse("$<$").is([150, 200])).toBeTruthy()

		expect(selectively.parse("200<150").is(undefined)).toBeFalsy()
		expect(selectively.parse("$<150").is(200)).toBeFalsy()
		expect(selectively.parse("200<$").is(150)).toBeFalsy()
		expect(selectively.parse("$<$").is([200, 150])).toBeFalsy()
		expect(selectively.parse("$<$").is([200, 150])).toBeFalsy()
	})
})
