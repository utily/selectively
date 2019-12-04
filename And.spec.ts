import * as selectively from "./index"

describe("and", () => {
	it("simple", () => expect(selectively.is({ class: selectively.and({ name: "test" }, { type: "type" }) }, { id: "axb", class: { name: "test", type: "type" } })).toBeTruthy())
	it("not", () => expect(selectively.is({ class: selectively.and({ name: "test" }, { type: "type" }) }, { id: "axb", class: { name: "test", type: "type2" } })).toBeFalsy())
	it("toString empty", () => expect(selectively.and().toString()).toEqual(""))
	it("generalize simple", () => expect(selectively.and("test").generalize()).toMatchObject(selectively.and(selectively.any("test"))))
	it("create", () => expect(selectively.and("test", { type: "type" })).toMatchObject({ class: "And", rules: [
	{
		"class": "Is",
		"value": "test",
	},
	{
		"class": "Property",
		"criteria": {
			"class": "Is",
			"value": "type",
		},
		"name": "type",
	}]}))
	it("generalize", () => expect(selectively.and("test", { type: "type" }).generalize()).toMatchObject({ class: "And", rules: [
	{
		"class": "Any",
		"criteria": {
			"class": "Is",
			"value": "test",
		},
	},
	{
		"class": "Property",
		"criteria": {
			"class": "Is",
			"value": "type",
		},
		"name": "type",
	},
	]}))
})
