/// <reference path="StringTrim.ts" />

module JPV.Validation.Filter
{
	export class StringTrimFactory implements Factory.SynchroneFilterFactory
	{
		produce(json: StringTrimJson)
		{
			return new StringTrim(json.infoText);	
		}
	}
}
