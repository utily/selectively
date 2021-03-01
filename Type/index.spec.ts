import * as selectively from "../index"

describe("selectively.Type", () => {
	it("Object", () => {
		const type = new selectively.Type.Object({ name: new selectively.Type.String() })
		expect(type).toMatchSnapshot()
	})
	it("Array", () => {
		const testArray: selectively.Type.Array = new selectively.Type.Array(new selectively.Type.String())
		expect(testArray).toMatchObject({})
	})
})
