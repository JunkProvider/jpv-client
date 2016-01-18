module JPV.Validation
{
	export class SynchroneFilterBase
	{
		private _text: string;
		
		get text() { return this._text; }
	
		constructor(text: string)
		{
			this._text = text;	
		}
		
		isSynchroneFilter()
		{
			return true;	
		}
		
		isValidationElement()
		{
			return true;	
		}
	}
}
