/// <reference path="NumberRange.ts" />

module JPV.Validation.Validator
{
	export class NumberRangeFactory implements Factory.SynchroneValidatorFactory
	{
		produce(json: NumberRangeJson)
		{
			return new NumberRange(
				json.min,
				json.minInclusive,
				json.max,
				json.maxInclusive,
				json.stopIfInvalid,
				json.infoText
			);	
		}		
	}
}
