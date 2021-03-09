import { execPath } from "process"
import * as selectively from "../index"
import { Token } from "../lexer"
import { tokenize } from "../lexer"

function t(data: string): Token[] {
	return tokenize("." + data)
		.map(t => ({ value: t.value }))
		.toArray()
}
describe("selectively.Type", () => {
	it("Tokenizer", () => {
		expect(t("object.has()")).toMatchSnapshot()
		expect(t("**")).toMatchSnapshot()
	})

	it("Object", () => {
		const type = new selectively.Type.Object({ name: new selectively.Type.String("") })
		expect(type).toMatchSnapshot()
	})
	it("Array", () => {
		const testArray: selectively.Type.Array = new selectively.Type.Array(new selectively.Type.String(""))
		expect(testArray.complete(t("ev"))).toMatchSnapshot()
		expect(testArray.complete(t(""))).toMatchSnapshot()
	})
	it("Boolean", () => {
		const testBoolean: selectively.Type.Boolean = new selectively.Type.Boolean()
		expect(testBoolean).toMatchSnapshot()
		expect(testBoolean.complete(t("tr"))).toMatchSnapshot()
		expect(testBoolean.complete(t(""))).toMatchSnapshot()
	})

	it("complete", () => {
		const object = new selectively.Type.Object({
			id: new selectively.Type.Object({
				first: new selectively.Type.String("test"),
				second: new selectively.Type.Boolean(),
			}),
			status: new selectively.Type.Object({
				statusArray: new selectively.Type.Array(new selectively.Type.String("")),
				statusString: new selectively.Type.String(""),
			}),
		})

		expect(object.complete(t(""))).toMatchSnapshot()
		expect(object.complete(t("has()"))).toMatchSnapshot()
		expect(object.complete(t("has(i)"))).toMatchSnapshot()
		expect(object.complete(t("has("))).toMatchSnapshot()
		expect(object.complete(t("has(id"))).toMatchSnapshot()
		expect(object.complete(t("id"))).toMatchSnapshot()
		expect(object.complete(t("id."))).toMatchSnapshot()
		expect(object.complete(t("id:"))).toMatchSnapshot()
		expect(object.complete(t("id.fir"))).toMatchSnapshot()
		expect(object.complete(t("id.first"))).toMatchSnapshot()
		expect(object.complete(t("id.first:"))).toMatchSnapshot()
		expect(object.complete(t("id.first:*"))).toMatchSnapshot()
		expect(object.complete(t("id.first:t*"))).toMatchSnapshot()
		expect(object.complete(t("id.first:e*"))).toMatchSnapshot()
		expect(object.complete(t("id.first:*s*"))).toMatchSnapshot()
		expect(object.complete(t("id.first:*o*"))).toMatchSnapshot()
		expect(object.complete(t("id.first:*st"))).toMatchSnapshot()
		expect(object.complete(t("id.has().prop"))).toMatchSnapshot()
	})
})
