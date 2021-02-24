import { CompareHelper } from "./CompareHelper"

describe("CompareHelper test", () => {
	it("CompareHelper tests #1", () => {
		const input = {
			testC: 700,
			refund: { something: { else: [] }, amount: 200, b: "theBee" },
			testA: 150,
			statistic: { refundable: 140 },
		}
		const thisValue: CompareHelper = [
			["amount", "$"],
			["refundable", "$"],
		]
		const reverse: CompareHelper = [
			["refundable", "$"],
			["amount", "$"],
		]
		let output = CompareHelper.adjustInput(thisValue, input)
		expect(output).toEqual([200, 140])
		output = CompareHelper.adjustInput(reverse, input)
		expect(output).toEqual([140, 200])
	})
})
