module JPV.Collection
{
	class KeyValuePair<K, V>
	{
		private _key: K;
		private _value: V;
		
		get key() { return this._key; }
		get value() { return this._value; }
		
		constructor(key: K, value: V)
		{
			this._key = key;
			this._value = value;	
		}
	}
	
	export class Dict<K, V>
	{
		private pairs: KeyValuePair<K, V>[] = [];
		
		getValue(key: K)
		{
			for (let pair of this.pairs)
			{
				if (pair.key == key)
					return pair.value;	
			}
			
			return undefined;
		}
		
		addValue(key: K, value: V)
		{
			var value = this.getValue(key);
			if (value != undefined)
				throw new Error("Key '" + String(key) + "' is already defined.");
			
			this.pairs.push(new KeyValuePair(key, value));
		}
		
		setValue(key: K, value: V)
		{
			var pair = new KeyValuePair(key, value);
			var index = this.getValueIndex(key);
			
			if (index == -1)
			{
				this.pairs.push(pair);
			}
			else
			{
				this.pairs[index] = pair;
			}
		}
		
		removeValue(key: K)
		{
			var index = this.getValueIndex(key);
			
			if (index == -1)
				return false;
			
			this.pairs.splice(index, 1);
			return true;
		}
		
		private getValueIndex(key: K)
		{
			var pairs = this.pairs;
			
			for (let i = 0, len = pairs.length; i < len; i++)
			{
				let pair = pairs[i];
				if (pair.key == key)
					return i;	
			}
			
			return -1;
		}
	}
}
