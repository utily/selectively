import { CompareHelper } from "./CompareHelper"

describe("CompareHelper test", () => {
	const thisValue: CompareHelper = [
		["amount", "$"],
		["refundable", "$"],
	]
	const reverse: CompareHelper = [
		["refundable", "$"],
		["amount", "$"],
	]
	it("CompareHelper tests #1", () => {
		const input = {
			testC: 700,
			refund: { something: { else: [] }, amount: 200, b: "theBee" },
			testA: 150,
			statistic: { refundable: 140 },
		}
		let output = CompareHelper.adjustInput(thisValue, input)
		expect(output).toEqual([200, 140])
		output = CompareHelper.adjustInput(reverse, input)
		expect(output).toEqual([140, 200])
	})
	it("CompareHelper toString", () => {
		expect(CompareHelper.toString(thisValue, "<")).toEqual("($amount < $refundable)")
		expect(CompareHelper.toString(thisValue, "<=")).toEqual("($amount <= $refundable)")
		expect(CompareHelper.toString(thisValue, ">")).toEqual("($amount > $refundable)")
		expect(CompareHelper.toString(thisValue, ">=")).toEqual("($amount >= $refundable)")
		expect(CompareHelper.toString([100, ["refundable", "$"]], "<")).toEqual("(100 < $refundable)")
		expect(CompareHelper.toString([["amount", "$"], 200], "<")).toEqual("($amount < 200)")
		expect(CompareHelper.toString([100, 200], "<")).toEqual("(100 < 200)")
		expect(CompareHelper.toString(200, "<")).toEqual("<200")
	})
})
