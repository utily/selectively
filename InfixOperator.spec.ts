import { InfixOperator } from "./InfixOperator"
import { Value } from "./Value"

describe("selectively.InfixOperator", () => {
	it("Addition", () => {
		const multiplyInfixOperator = InfixOperator.create("+", new Value(2), new Value(3))
		expect(multiplyInfixOperator.toString()).toEqual("2 + 3")
		expect(multiplyInfixOperator.evaluate()).toEqual(5)
	})
	it("Multiplication", () => {
		const multiplyInfixOperator = InfixOperator.create("*", new Value(2), new Value(3))
		expect(multiplyInfixOperator.toString()).toEqual("2 * 3")
		expect(multiplyInfixOperator.evaluate()).toEqual(6)
	})
	it("Addition and multiplication", () => {
		const multiplyInfixOperator = InfixOperator.create("*", new Value(2), new Value(3))
		const AddInfixOperator = InfixOperator.create("+", multiplyInfixOperator, new Value(4))
		expect(AddInfixOperator.toString()).toEqual("2 * 3 + 4")
		expect(AddInfixOperator.evaluate()).toEqual(10)
	})
	it("toString precedence test", () => {
		const AddInfixOperator = InfixOperator.create("+", new Value(3), new Value(4))
		const multiplyInfixOperator = InfixOperator.create("*", new Value(2), AddInfixOperator)
		expect(multiplyInfixOperator.toString()).toEqual("2 * (3 + 4)")
		expect(multiplyInfixOperator.evaluate()).toEqual(14)
	})
})
