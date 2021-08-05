import { Rule } from "./Rule"

export class Definition {
	constructor(readonly identifier: string, readonly argument: any[], readonly rule: Rule) {}
	call(argument: any[], value: any): boolean {
		return this.rule.is(value)
	}
}
