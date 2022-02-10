import { Definition } from "../Definition"
import * as selectively from "../index"
import { tokenize } from "../lexer"
import { resolve } from "./index"

describe("any", () => {
	function t(data: string): string[] {
		return tokenize(data)
			.map(item => item.value)
			.filter(item => item != undefined)
			.toArray() as string[]
	}
	it("simple", () => {
		const testString = "ThreeD(250)"
		const parsed = selectively.parse(testString)
		expect(t(testString)).toEqual(["ThreeD", "(", "250", ")"])
		expect(parsed).toEqual({
			argument: ["250"],
			class: "FunctionCall",
			definition: undefined,
			identifier: "ThreeD",
			precedence: 85,
		})
		const definitions: Record<string, Definition> = {
			ThreeD: {
				arguments: ["limit"],
				definition:
					"authorization.amount>limit !(authorization.verification:verified) !(authorization.recurring:subsequent)",
			},
		}
		const resolved = resolve(definitions, parsed)
		expect(resolved.is({ authorization: { amount: 300, verification: "verified", recurring: "false" } })).toEqual(false)
		expect(resolved.is({ authorization: { amount: 300, verification: "false", recurring: "subsequent" } })).toEqual(
			false
		)
		expect(resolved.is({ authorization: { amount: 300, verification: "false", recurring: "false" } })).toEqual(true)
		expect(resolved.is({ authorization: { amount: 30, verification: "verified", recurring: "false" } })).toEqual(false)
		expect(resolved.is({ authorization: { amount: 30, verification: "false", recurring: "subsequent" } })).toEqual(
			false
		)
		expect(resolved.is({ authorization: { amount: 30, verification: "false", recurring: "false" } })).toEqual(false)
	})
	it("without function", () => {
		const testString = "amount > 10"
		const parsed = selectively.parse(testString)
		const definitions: Record<string, Definition> = {
			ThreeD: {
				arguments: ["limit"],
				definition:
					"authorization.amount>limit !(authorization.verification:verified) !(authorization.recurring:subsequent)",
			},
		}
		const resolved = resolve(definitions, parsed)
		expect(resolved.is({ amount: 9 })).toEqual(false)
		expect(resolved.is({ amount: 10 })).toEqual(false)
		expect(resolved.is({ amount: 11 })).toEqual(true)
	})

	it("several arguments", () => {
		const testString = "inbetween(2, 10)"
		const parsed = selectively.parse(testString)
		expect(parsed).toEqual({
			argument: ["2", "10"],
			class: "FunctionCall",
			definition: undefined,
			identifier: "inbetween",
			precedence: 85,
		})
		const definitions: Record<string, Definition> = {
			inbetween: {
				arguments: ["min", "amount"],
				definition: "amount>min amount<amount",
			},
		}
		const resolved = resolve(definitions, parsed)
		expect(resolved).toEqual({
			argument: ["2", "10"],
			class: "FunctionCall",
			definition: {
				class: "And",
				precedence: 40,
				rules: [
					{
						class: "Property",
						criteria: { class: "GreaterThan", precedence: 85, symbol: ">", value: 2 },
						name: "amount",
						precedence: 80,
						symbol: ".",
					},
					{
						class: "Property",
						criteria: { class: "LesserThan", precedence: 85, symbol: "<", value: 10 },
						name: "amount",
						precedence: 80,
						symbol: ".",
					},
				],
			},
			identifier: "inbetween",
			precedence: 85,
		})
		expect(resolved.is({ amount: 1 })).toEqual(false)
		expect(resolved.is({ amount: 5 })).toEqual(true)
		expect(resolved.is({ amount: 11 })).toEqual(false)
	})
	it("no argument", () => {
		const testString = "currency()"
		const parsed = selectively.parse(testString)
		expect(parsed).toEqual({
			argument: [""],
			class: "FunctionCall",
			definition: undefined,
			identifier: "currency",
			precedence: 85,
		})
		const definitions: Record<string, Definition> = {
			currency: {
				arguments: [""],
				definition: "authorization.currency:SEK",
			},
		}
		const resolved = resolve(definitions, parsed)
		expect(resolved).toEqual({
			argument: [""],
			class: "FunctionCall",
			definition: {
				class: "Property",
				criteria: {
					class: "Property",
					criteria: { class: "Is", precedence: 9007199254740991, symbol: ":", value: "SEK" },
					name: "currency",
					precedence: 80,
					symbol: ".",
				},
				name: "authorization",
				precedence: 80,
				symbol: ".",
			},
			identifier: "currency",
			precedence: 85,
		})
		expect(resolved.is({ authorization: { currency: "SEK" } })).toEqual(true)
		expect(resolved.is({ authorization: { currency: "NOK" } })).toEqual(false)
		expect(resolved.is({ authorization: { amount: 3 } })).toEqual(false)
	})
	it("function not found", () => {
		const testString = "notDefined()"
		const parsed = selectively.parse(testString)
		const definitions: Record<string, Definition> = {
			currency: {
				arguments: [""],
				definition: "authorization.currency:SEK",
			},
		}
		const resolved = resolve(definitions, parsed)
		expect(resolved).toEqual({
			argument: [""],
			class: "FunctionCall",
			definition: undefined,
			identifier: "notDefined",
			precedence: 85,
		})
		expect(resolved.is({ authorization: { currency: "SEK" } })).toEqual(true)
		expect(resolved.is({ authorization: { currency: "NOK" } })).toEqual(true)
		expect(resolved.is({ authorization: { amount: 3 } })).toEqual(true)
	})
})
