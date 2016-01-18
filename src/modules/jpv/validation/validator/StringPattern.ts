/// <reference path="../SynchroneValidatorBase.ts" />

module JPV.Validation.Validator
{
	export class StringPattern
		extends SynchroneValidatorBase
		implements SynchroneValidator<string>
	{
		private _pattern: string;
		
		get pattern() { return this._pattern; }
		
		constructor(pattern: string, stopIfInvalid: boolean = false, text: string = null)
		{
			super(stopIfInvalid, text);
			this._pattern = pattern;
		}
		
		isValid(value: string)
		{
			let regExp = new RegExp(this.pattern);
			return regExp.test(value);
		}
	}
}
