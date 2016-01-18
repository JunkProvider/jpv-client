/// <reference path="../SynchroneValidatorBase.ts" />

module JPV.Validation.Validator
{
	export class NumberRange
		extends SynchroneValidatorBase
		implements SynchroneValidator<number>
	{
		private _min: number;
		private _minInclusive: boolean;
		private _max: number;
		private _maxInclusive: boolean;
		
		get min() { return this._min; }
		get minInclusive() { return this._minInclusive; }
		get max() { return this._max; }
		get maxInclusive() { return this._maxInclusive; }
		
		constructor(
			min: number = null,
			minInclusive: boolean = true,
			max: number = null,
			maxInclusive: boolean = true,
			stopIfInvalid: boolean = false,
			text: string = null
		)
		{
			super(stopIfInvalid, text);
			this._min = min;
			this._minInclusive = minInclusive;
			this._max = max;
			this._maxInclusive = maxInclusive;
		}
		
		isValid(value: number)
		{
			if (value == null || isNaN(value) || !isFinite(value))
				return false;
			
			if (this.min != null)
			{
				if (this.minInclusive)
				{
					if (value < this.min)
						return false;	
				}
				else
				{
					if (value <= this.min)
						return false;
				}
			}
			
			if (this.max != null)
			{
				if (this.maxInclusive)
				{
					if (value > this.max)
						return false;	
				}
				else
				{
					if (value >= this.max)
						return false;
				}
			}
			
			return true;
		}
	}	
}
