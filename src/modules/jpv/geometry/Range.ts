module JPV.Geometry
{
	export class Range
	{
		private _value1: number;
		private _value2: number;
		
		get value1() { return this._value1; }
		get value2() { return this._value2; }
		
		get min() { return Math.min(this._value1, this._value2); }
		get max() { return Math.max(this._value1, this._value2); }
		
		constructor(value1: number, value2: number)
		{
			this._value1 = value1;
			this._value2 = value2;
		}

		equals(range: Range)
		{
			if (range == null)
				return false;
			
			return range._value1 == this._value1 && range._value2 == this._value2;
		}
		
		toString()
		{
			return "Range(" + this._value1 + ", " + this._value2 + ")";	
		}
	}	
}
