module JPV.Validation
{
	export class SynchroneValidatorBase
	{
		private _stopIfInvalid: boolean;
		private _text: string;
		
		get stopIfInvalid() { return this._stopIfInvalid; }
		get text() { return this._text; }
	
		constructor(stopIfInvalid: boolean, text: string)
		{
			this._stopIfInvalid = stopIfInvalid;
			this._text = text;	
		}
		
		isSynchroneValidator()
		{
			return true;	
		}
		
		isValidationElement()
		{
			return true;	
		}
	}
}
