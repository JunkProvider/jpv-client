/// <reference path="StringLength.ts" />

module JPV.Validation.Validator
{
	export class StringLengthFactory implements Factory.SynchroneValidatorFactory
	{
		produce(json: StringLengthJson)
		{
			return new StringLength(json.min, json.max, json.stopIfInvalid, json.infoText);	
		}		
	}
}
