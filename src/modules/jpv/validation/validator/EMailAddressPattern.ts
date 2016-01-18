/// <reference path="StringPattern.ts" />

module JPV.Validation.Validator
{
	export class EMailAddressPattern
		extends StringPattern
	{
		static PATTERN = ".+@.+\\..+";
		
		constructor(stopIfInvalid: boolean = false)
		{
			super(EMailAddressPattern.PATTERN, stopIfInvalid, "Must be a valid e-mail address.");
		}
	}
}
