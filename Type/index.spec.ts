import * as selectively from "../index"
import { Token } from "../lexer"
import { tokenize } from "../lexer"
import { Completion } from "./Completion"

function t(data: string): Token[] {
	return tokenize(data, undefined, [
		"!",
		"(",
		")",
		"[",
		"]",
		"|",
		" | ",
		"*",
		":",
		".",
		"<=",
		">=",
		"<",
		">",
		" * ",
		" + ",
		" - ",
		"-",
		" / ",
	])
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

describe("selectively.Type", () => {
	it("Tokenizer", () => {
		expect(t("")).toEqual([])
	})
	it("complete", () => {
		const testObject = selectively.Type.convert(testing)
		expect(Completion.stringify(testObject.complete(t("")))).toEqual(["merchant_", "authorization_", "!_"])
		expect(Completion.stringify(testObject.complete(t("merc")))).toEqual(["merchant_"])
		expect(Completion.stringify(testObject.complete(t("merchant")))).toEqual(["merchant._", "merchant:_"])
		expect(Completion.stringify(testObject.complete(t("merchant:")))).toEqual(["merchant:has(_)"])
		expect(Completion.stringify(testObject.complete(t("merchant.")))).toEqual([
			"merchant.name_",
			"merchant.descriptor_",
			"merchant.country_",
			"merchant.currency_",
			"merchant.captured_",
			"merchant.fees_",
			"merchant.refundable_",
			"merchant.settled_",
			"merchant.scheme_",
		])
		expect(Completion.stringify(testObject.complete(t("merchant.name")))).toEqual([
			"merchant.name:_",
			"merchant.name>_",
			"merchant.name>=_",
			"merchant.name<_",
			"merchant.name<=_",
		])
		expect(Completion.stringify(testObject.complete(t("merchant.name:")))).toEqual([
			"merchant.name:*_",
			"merchant.name:*_*",
			"merchant.name:/_/",
			"merchant.name:!_",
			"merchant.name:_*",
		])
	})

	it("right hand side test with string on left hand", () => {
		const testObject = selectively.Type.convert(testing)
		expect(Completion.stringify(testObject.complete(t("!")))).toEqual(["!merchant_", "!authorization_"])
		expect(Completion.stringify(testObject.complete(t("merchant.name>")))).toEqual([
			"merchant.name>merchant._",
			"merchant.name>authorization._",
			"merchant.name>!_",
			"merchant.name>=_",
		])
		expect(testObject).toEqual(testObject)
		expect(Completion.stringify(testObject.complete(t("merchant.name>authorization.")))).toEqual([
			"merchant.name>authorization.currency_",
			"merchant.name>authorization.card._",
			"merchant.name>authorization.capture_",
			"merchant.name>authorization.descriptor_",
			"merchant.name>authorization.recurring_",
			"merchant.name>authorization.verification_",
		])
		expect(Completion.stringify(testObject.complete(t("merchant.name>authorization.car")))).toEqual([
			"merchant.name>authorization.card._",
		])
		expect(Completion.stringify(testObject.complete(t("merchant.name>authorization.card.")))).toEqual([
			"merchant.name>authorization.card.iin_",
			"merchant.name>authorization.card.last4_",
			"merchant.name>authorization.card.scheme_",
			"merchant.name>authorization.card.csc_",
			"merchant.name>authorization.card.type_",
		])
	})
	it("right hand side test with number on left hand", () => {
		const testObject = selectively.Type.convert(testing)
		expect(Completion.stringify(testObject.complete(t("merchant.captured:")))).toEqual([
			"merchant.captured:merchant._",
			"merchant.captured:authorization._",
			"merchant.captured:!_",
		])
		expect(Completion.stringify(testObject.complete(t("merchant.captured")))).toEqual([
			"merchant.captured>_",
			"merchant.captured>=_",
			"merchant.captured<_",
			"merchant.captured<=_",
			"merchant.captured:_",
		])
		expect(Completion.stringify(testObject.complete(t("merchant.captured>")))).toEqual([
			"merchant.captured>merchant._",
			"merchant.captured>authorization._",
			"merchant.captured>=_",
		])
		expect(Completion.stringify(testObject.complete(t("merchant.captured>auth")))).toEqual([
			"merchant.captured>authorization._",
		])
		expect(Completion.stringify(testObject.complete(t("merchant.captured>authorization.")))).toEqual([
			"merchant.captured>authorization.amount_",
		])
	})
	it("algebra and literals", () => {
		const testObject = selectively.Type.convert(testing)
		expect(Completion.stringify(testObject.complete(t("merchant.captured>9")))).toEqual([
			"merchant.captured>9 merchant_",
			"merchant.captured>9 authorization_",
			"merchant.captured>9 !_",
			"merchant.captured>9 | _",
			"merchant.captured>9 + _",
			"merchant.captured>9 - _",
			"merchant.captured>9 * _",
		])
		expect(Completion.stringify(testObject.complete(t("merchant.captured>authorization.amount + ")))).toEqual([
			"merchant.captured>authorization.amount + merchant._",
			"merchant.captured>authorization.amount + authorization._",
		])
		expect(Completion.stringify(testObject.complete(t("merchant.captured>authorization.amount-")))).toEqual([
			"merchant.captured>authorization.amount - _",
		])
	})
	it("And and Or completion test", () => {
		const testObject = selectively.Type.convert(testing)
		expect(Completion.stringify(testObject.complete(t("merchant.captured>authorization.amount")))).toEqual([
			"merchant.captured>authorization.amount merchant_",
			"merchant.captured>authorization.amount authorization_",
			"merchant.captured>authorization.amount !_",
			"merchant.captured>authorization.amount | _",
			"merchant.captured>authorization.amount + _",
			"merchant.captured>authorization.amount - _",
			"merchant.captured>authorization.amount * _",
		])
		expect(Completion.stringify(testObject.complete(t("merchant.captured>authorization.amount|")))).toEqual([
			"merchant.captured>authorization.amount | _",
		])
		expect(Completion.stringify(testObject.complete(t("merchant.captured>authorization.amount | merchant.")))).toEqual([
			"merchant.captured>authorization.amount | merchant.name_",
			"merchant.captured>authorization.amount | merchant.descriptor_",
			"merchant.captured>authorization.amount | merchant.country_",
			"merchant.captured>authorization.amount | merchant.currency_",
			"merchant.captured>authorization.amount | merchant.captured_",
			"merchant.captured>authorization.amount | merchant.fees_",
			"merchant.captured>authorization.amount | merchant.refundable_",
			"merchant.captured>authorization.amount | merchant.settled_",
			"merchant.captured>authorization.amount | merchant.scheme_",
		])
	})
})
