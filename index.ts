import "./Always"
import { And, and } from "./And"
import { Any, any } from "./Any"
import { Criteria } from "./Criteria"
import { EndsWith, endsWith } from "./EndsWith"
import { Every, every } from "./Every"
import { GreaterThan, greaterThan } from "./GreaterThan"
import { GreaterThanOrEqual, greaterThanOrEqual } from "./GreaterThanOrEqual"
import { Has, has } from "./Has"
import { Includes, includes } from "./Includes"
import { Is } from "./Is"
import { LesserThan, lesserThan } from "./LesserThan"
import { LesserThanOrEqual, lesserThanOrEqual } from "./LesserThanOrEqual"
import { Match, match } from "./Match"
import { Not, not } from "./Not"
import { Or, or } from "./Or"
import { parse } from "./parse"
import { Property, property } from "./Property"
import { create, Rule } from "./Rule"
import { Some, some } from "./Some"
import { StartsWith, startsWith } from "./StartsWith"
import { Tuple } from "./Tuple"
import { Type as SType } from "./Type"

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
	Has,
	GreaterThan,
	GreaterThanOrEqual,
	LesserThan,
	LesserThanOrEqual,
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
	SType as Type,
	any,
	and,
	create,
	endsWith,
	every,
	has,
	filter,
	greaterThan,
	greaterThanOrEqual,
	lesserThan,
	lesserThanOrEqual,
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
