/// <reference path="StringLength.ts" />

module JPV.Validation.Validator
{
	export class StringPatternFactory implements Factory.SynchroneValidatorFactory
	{
		produce(json: StringPatternJson)
		{
			return new StringPattern(json.pattern, json.stopIfInvalid, json.infoText);	
		}		
	}
}
