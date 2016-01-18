module JPV.Collection
{
	export class Map<Value>
	{
		static createFromArray<Value>(values: Value[], getKey: (value: Value) => string)
		{
			const valuesWithKeys: IndexedObject<Value> = {}
			for (let i = 0, len = values.length; i < len; i++)
			{
				valuesWithKeys[getKey(values[i])] = values[i];	
			}
			return new Map<Value>(valuesWithKeys);
		}
		
		private values: IndexedObject<Value> = {};
		
		constructor(values: IndexedObject<Value> = {})
		{
			this.values = values;	
		}
		
		contains(key: any)
		{
			return this.values[key] != undefined;	
		}
		
		get(key: any)
		{
			return this.values[key];	
		}
		
		add(key: any, value: Value)
		{
			key = String(key);
			if (this.values[key] != undefined)
				throw new Error("Key '" + key + "' is already defined.");
			
			this.values[key] = value;
		}
		
		set(key: any, value: Value)
		{
			key = String(key);
			this.values[key] = value;
		}
		
		remove(key: any)
		{
			key = String(key);
			delete this.values[key];
		}
		
		merge(map: Map<Value>)
		{
			let values = map.values;
			for (let key in values)
			{
				this.set(key, values[key]);	
			}
		}
		
		toArray()
		{
			const array: Value[] = [];
			for (const key in this.values)
			{
				array.push(this.values[key]);
			}
			return array;
		}
	}	
}
