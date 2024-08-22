import { isly } from "isly"
import { Array as TArray } from "./Array"
import { Base } from "./Base"
import { Boolean as TBoolean } from "./Boolean"
import { Number as TNumber } from "./Number"
import { TObject } from "./Object"
import { String as TString } from "./String"
import { Union as TUnion } from "./Union"

export class Transformer extends isly.Transformer<Base> {
	constructor() {
		super()
	}
	protected onBoolean(): Base | undefined {
		return new TBoolean()
	}
	protected onIntersection(type: isly.Type, types: isly.Type<unknown>[]): Base | undefined {
		return this.onUnion(type, types)
	}
	protected onLazy(type: isly.Type, backend: isly.Type<unknown>): Base | undefined {
		return this.transform(backend)
	}
	protected onNamed(type: isly.Type, backend: isly.Type<unknown>): Base | undefined {
		return this.transform(backend)
	}
	protected onNumber(): Base | undefined {
		return new TNumber()
	}
	protected onObject(type: isly.Type, properties: isly.object.Properties<any, object>): Base | undefined {
		return new TObject(
			Object.entries(properties).reduce((r, [key, value]) => ({ ...r, [key]: this.transform(value) }), {})
		)
	}
	protected onString(type: isly.Type<string>): Base | undefined {
		let result: Base | undefined
		if (typeof type.condition == "string")
			result = new TUnion(type.condition.split(" | ").flatMap(condition => new TString(condition)))
		else
			result = new TString()
		return result
	}
	protected onTuple(type: isly.Type, items: isly.Type[]): Base | undefined {
		return new TArray(items.flatMap(item => this.transform(item) ?? []))
	}
	protected onArray(type: isly.Type, itemType: isly.Type): Base | undefined {
		const items = this.transform(itemType)
		return new TArray(items ? [items] : [])
	}
	protected onOptional(type: isly.Type, backend: isly.Type): Base | undefined {
		return this.transform(backend)
	}
	protected onReadonly(type: isly.Type, backend: isly.Type): Base | undefined {
		return this.transform(backend)
	}
	protected onUnion(type: isly.Type, types: isly.Type[]): Base | undefined {
		return new TUnion(types.flatMap(type => this.transform(type) ?? []))
	}
}
