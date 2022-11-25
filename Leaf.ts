import { Rule } from "./Rule"

export abstract class Leaf extends Rule {
	get(path: string[]): Rule | undefined {
		return !path.length ? this : undefined
	}
}
