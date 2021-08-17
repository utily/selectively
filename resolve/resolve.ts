import { Definition } from "../Definition"
import { Rule } from "../Rule"

export function resolve(
	definitions: Definition[],
	rule: Rule,
	argument: { input: any[]; identifier: string[] } = { input: [], identifier: [] }
): Rule {
	const resolver = resolvers[rule?.class]
	return resolver ? resolver(definitions, rule, argument) : rule
}

export type Resolver<T extends Rule = Rule> = (
	definitions: Definition[],
	rule: T,
	argument: { input: any[]; identifier: string[] }
) => T
const resolvers: { [className: string]: Resolver | undefined } = {}
export function add<T extends Rule>(className: string, resolver: Resolver<T>): void {
	resolvers[className] = (resolver as any) as Resolver
}
