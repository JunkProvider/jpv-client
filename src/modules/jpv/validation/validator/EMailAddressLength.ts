/// <reference path="StringLength.ts" />

module JPV.Validation.Validator
{
	export class EMailAddressLength
		extends StringLength
	{
		static MAX_LENGTH = 254;
		
		constructor(stopIfInvalid: boolean = false)
		{
			super(
				null,
				EMailAddressLength.MAX_LENGTH,
				stopIfInvalid,
				"Can not have more than " + EMailAddressLength.MAX_LENGTH + " characters."
			);
		}
	}
}
