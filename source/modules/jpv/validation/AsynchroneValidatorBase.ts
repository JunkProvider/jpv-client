module JPV.Validation
{
	export class AsynchroneValidatorBase
	{
		private _text: string;
		
		get text() { return this._text; }
	
		constructor(text: string)
		{
			this._text = text;	
		}
		
		isAsynchroneValidator()
		{
			return true;	
		}
		
		isValidationElement()
		{
			return true;	
		}
	}
}
