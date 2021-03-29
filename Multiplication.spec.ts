import { Multiplication } from "./Multiplication"
import { Value } from "./Value"
describe("selectively.Addition", () => {
	it("Multiplication", () => {
		const adder = new Multiplication(new Value(5), new Value(3))
		expect(adder.toString()).toEqual("5 * 3")
	})
})
