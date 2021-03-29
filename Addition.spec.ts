import { Addition } from "./Addition"
import { Multiplication } from "./Multiplication"
import { Value } from "./Value"

describe("selectively.Addition", () => {
	it("Multiplication and Addition", () => {
		const multiplyAddition = new Multiplication(new Addition(new Value(1), new Value(2)), new Value(3))
		expect(multiplyAddition.toString()).toEqual("(1 + 2) * 3")
		expect(multiplyAddition.evaluate()).toEqual(9)
	})
	it("2Addition and Multiplication", () => {
		const addMultiplication = new Addition(new Value(4), new Multiplication(new Value(3), new Value(2)))
		expect(addMultiplication.toString()).toEqual("4 + 3 * 2")
		expect(addMultiplication.evaluate()).toEqual(10)
	})
	it("3Addition and Multiplication", () => {
		const addMultiplication = new Addition(
			new Value(5),
			new Addition(new Multiplication(new Value(6), new Value(7)), new Value(5))
		)
		expect(addMultiplication.toString()).toEqual("5 + 6 * 7 + 5")
		expect(addMultiplication.evaluate()).toEqual(52)
	})
})
