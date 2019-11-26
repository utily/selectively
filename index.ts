import "./Always"
import { and, And } from "./And"
import { any, Any } from "./Any"
import { Criteria } from "./Criteria"
import { endsWith, EndsWith } from "./EndsWith"
import { every, Every } from "./Every"
import { includes, Includes } from "./Includes"
import { Is } from "./Is"
import { match, Match } from "./Match"
import { not, Not } from "./Not"
import { or, Or } from "./Or"
import { property, Property } from "./Property"
import { Rule, create } from "./Rule"
import { some, Some } from "./Some"
import { startsWith, StartsWith } from "./StartsWith"
import { Tuple } from "./Tuple"
import { parse } from "./parse"

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
