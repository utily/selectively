import * as selectively from "../index"
import { Token } from "../lexer"
import { tokenize } from "../lexer"
import { Completion } from "./Completion"

function t(data: string): Token[] {
	return tokenize(data)
		.map(t => ({ value: t.value }))
		.toArray()
}
const testing = {
	merchant: {
		name: "Example AB",
		descriptor: "Example Company",
		country: "SE",
		currency: "SEK",
		captured: 1000,
		fees: 1000,
		refundable: 1000,
		settled: 1000,
		scheme: ["visa", "mastercard"],
	},
	authorization: {
		amount: 10,
		currency: "SEK",
		card: {
			iin: "411111",
			last4: "1111",
			scheme: "visa",
			csc: "present",
			type: "debit",
		},
		capture: "auto",
		descriptor: "Example AB",
		recurring: "initial",
		verification: "rejected",
	},
}
const output = selectively.Type.convert(testing)
describe("selectively.Type", () => {
	it("Tokenizer", () => {
		expect(t("")).toEqual([])
	})
	it("complete", () => {
		expect(Completion.stringify(output.complete(t("")))).toEqual(["merchant|", "authorization|"])
		expect(Completion.stringify(output.complete(t("merc")))).toEqual(["merchant|"])
		expect(Completion.stringify(output.complete(t("merchant")))).toEqual(["merchant.|", "merchant:|"])
		expect(Completion.stringify(output.complete(t("merchant.")))).toEqual([
			"merchant.name|",
			"merchant.descriptor|",
			"merchant.country|",
			"merchant.currency|",
			"merchant.captured|",
			"merchant.fees|",
			"merchant.refundable|",
			"merchant.settled|",
			"merchant.scheme|",
		])
		expect(Completion.stringify(output.complete(t("merchant.name")))).toEqual([
			"merchant.name:|",
			"merchant.name>|",
			"merchant.name>=|",
			"merchant.name<|",
			"merchant.name<=|",
		])
		expect(Completion.stringify(output.complete(t("merchant.name:")))).toEqual([
			"merchant.name:*|",
			"merchant.name:*|*",
			"merchant.name:/|/",
			"merchant.name:!|",
			"merchant.name:|*",
		])
	})

	it("right hand side test with string on left hand", () => {
		expect(Completion.stringify(output.complete(t("merchant.name>")))).toEqual([
			"merchant.name>merchant.|",
			"merchant.name>authorization.|",
			"merchant.name>=|",
		])
		expect(Completion.stringify(output.complete(t("merchant.name>authorization.")))).toEqual([
			"merchant.name>authorization.currency|",
			"merchant.name>authorization.card.|",
			"merchant.name>authorization.capture|",
			"merchant.name>authorization.descriptor|",
			"merchant.name>authorization.recurring|",
			"merchant.name>authorization.verification|",
		])
		expect(Completion.stringify(output.complete(t("merchant.name>authorization.car")))).toEqual([
			"merchant.name>authorization.card.|",
		])
		expect(Completion.stringify(output.complete(t("merchant.name>authorization.card.")))).toEqual([
			"merchant.name>authorization.card.iin|",
			"merchant.name>authorization.card.last4|",
			"merchant.name>authorization.card.scheme|",
			"merchant.name>authorization.card.csc|",
			"merchant.name>authorization.card.type|",
		])
	})
	it("right hand side test with number on left hand", () => {
		expect(Completion.stringify(output.complete(t("merchant.captured")))).toEqual([
			"merchant.captured>|",
			"merchant.captured>=|",
			"merchant.captured<|",
			"merchant.captured<=|",
			"merchant.captured:|",
		])
		expect(Completion.stringify(output.complete(t("merchant.captured>")))).toEqual([
			"merchant.captured>merchant.|",
			"merchant.captured>authorization.|",
			"merchant.captured>=|",
		])
		expect(Completion.stringify(output.complete(t("merchant.captured>auth")))).toEqual([
			"merchant.captured>authorization.|",
		])
		expect(Completion.stringify(output.complete(t("merchant.captured>authorization.")))).toEqual([
			"merchant.captured>authorization.amount|",
		])
		expect(Completion.stringify(output.complete(t("merchant.captured>authorization.amount")))).toEqual([
			"merchant.captured>authorization.amount + |",
			"merchant.captured>authorization.amount - |",
			"merchant.captured>authorization.amount * |",
		])
		expect(Completion.stringify(output.complete(t("merchant.captured>authorization.amount + ")))).toEqual([
			"merchant.captured>authorization.amount + merchant.|",
			"merchant.captured>authorization.amount + authorization.|",
		])
	})
})
