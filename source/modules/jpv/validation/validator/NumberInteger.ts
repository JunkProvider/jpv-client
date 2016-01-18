/// <reference path="../SynchroneValidatorBase.ts" />

module JPV.Validation.Validator
{
	export class NumberInteger
		extends SynchroneValidatorBase
		implements SynchroneValidator<number>
	{
		isValid(value: number)
		{
			if (value == null || isNaN(value) || !isFinite(value))
				return false;
			
			return value == Math.floor(value);
		}
	}	
}
