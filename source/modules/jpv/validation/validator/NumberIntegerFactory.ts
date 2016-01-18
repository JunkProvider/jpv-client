/// <reference path="NumberInteger.ts" />

module JPV.Validation.Validator
{
	export class NumberIntegerFactory implements Factory.SynchroneValidatorFactory
	{
		produce(json: NumberIntegerJson)
		{
			return new NumberInteger(json.stopIfInvalid, json.infoText);	
		}		
	}
}
