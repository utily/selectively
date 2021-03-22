import { Addition } from "./Addition"
import { Multiplication } from "./Multiplication"

describe("selectively.Type", () => {
	it("Addition", () => {
		const adder = new Addition(5, 3)
		expect(adder).toMatchSnapshot()
	})
	it("Multiplication", () => {
		const adder = new Multiplication(5, 3)
		expect(adder).toMatchSnapshot()
	})
	it("Multiplication and Addition", () => {
		const adder = new Multiplication(new Addition(4, 5), 3)
		expect(adder).toMatchSnapshot()
	})
})
