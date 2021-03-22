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
		const multiplyAddition = new Multiplication(new Addition(4, 3), 2)
		expect(multiplyAddition).toMatchSnapshot()
		expect(multiplyAddition.toString()).toMatchSnapshot()
		expect(multiplyAddition.evaluate()).toMatchSnapshot()
	})
	it("Addition and Multiplication", () => {
		const addMultiplication = new Addition(4, new Multiplication(3, 2))
		expect(addMultiplication).toMatchSnapshot()
		expect(addMultiplication.toString()).toMatchSnapshot()
		expect(addMultiplication.evaluate()).toMatchSnapshot()
	})
})
