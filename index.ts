import "./Always"
import { And, and } from "./And"
import { Any, any } from "./Any"
import { Criteria } from "./Criteria"
import { EndsWith, endsWith } from "./EndsWith"
import { Every, every } from "./Every"
import { Includes, includes } from "./Includes"
import { Is } from "./Is"
import { Match, match } from "./Match"
import { Not, not } from "./Not"
import { Or, or } from "./Or"
import { parse } from "./parse"
import { Property, property } from "./Property"
import { create, Rule } from "./Rule"
import { Some, some } from "./Some"
import { StartsWith, startsWith } from "./StartsWith"
import { Tuple } from "./Tuple"

function is(criteria: Criteria): Rule
function is(criteria: Criteria, value?: any): boolean
function is(criteria: Criteria, value?: any): Rule | boolean {
	const result = create(criteria)
	return value ? result.is(value) : result
}
function filter<T>(criteria: Criteria, value: T[]): T[] {
	const c = create(criteria)
	return c.filter(value)
}

export {
	And,
	Any,
	Criteria,
	EndsWith,
	Every,
	Includes,
	Is,
	Match,
	Not,
	Or,
	Property,
	Rule,
	Some,
	StartsWith,
	Tuple,
	any,
	and,
	create,
	endsWith,
	every,
	filter,
	includes,
	is,
	match,
	not,
	or,
	parse,
	property,
	some,
	startsWith,
}
