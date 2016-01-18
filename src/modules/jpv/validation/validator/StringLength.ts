/// <reference path="../SynchroneValidatorBase.ts" />

module JPV.Validation.Validator
{
	export class StringLength
		extends SynchroneValidatorBase
		implements SynchroneValidator<string>
	{
		private _min: number;
		private _max: number;
		
		get min() { return this._min; }
		get max() { return this._max; }
		
		constructor(min: number = null, max: number = null, stopIfInvalid: boolean = false, text: string = null)
		{
			super(stopIfInvalid, text);
			this._min = min;
			this._max = max;	
		}
		
		isValid(value: string)
		{
			let stringLength = value.length;
			
			if (this.min != null && stringLength < this.min)
				return false;
			
			if (this.max != null && stringLength > this.max)
				return false;
			
			return true;
		}
	}
}
