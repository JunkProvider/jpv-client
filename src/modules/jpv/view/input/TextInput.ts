/// <reference path="../View" />

module JPV.View.Input
{
	export abstract class TextInput extends View implements IInput<string> 
	{
		valueChangedEvent = new Event.Event<boolean>();
		
		private maxLength: number = null;
		private allowedCharacters: string = null;
		
		get htmlElement() { return <HTMLInputElement>this._htmlElement; }
		
		constructor(htmlElement: HTMLInputElement)
		{
			super(htmlElement);
			this.htmlElement.onchange = () => {
				this.validateCurrentValue();
				this.valueChangedEvent.trigger(this, true);
			}
		}
		
		setMaxLength(maxLength: number)
		{
			this.maxLength = maxLength;
			this.htmlElement.maxLength = maxLength;
			this.validateCurrentValue();
		}
		
		setAllowedCharacters(allowedCharacters: string)
		{
			this.allowedCharacters = allowedCharacters;
			this.validateCurrentValue();
		}
		
		getValue()
		{
			return this.htmlElement.value;	
		}
		
		setValue(value: string)
		{
			value = this.validateValue(value);
			const prevValue = this.htmlElement.value;
			if (value == prevValue)
				return;
			
			this.htmlElement.value = value;
			this.valueChangedEvent.trigger(this, false);
		}
		
		protected onUserInput()
		{
			this.validateCurrentValue();
			this.valueChangedEvent.trigger(this, true);
		}
		
		protected validateCurrentValue()
		{
			this.htmlElement.value = this.validateValue(this.htmlElement.value);	
		}
		
		protected validateValue(value: string)
		{
			if (this.maxLength != null)
			{
				value = value.substring(0, this.maxLength);
			}
			
			if (this.allowedCharacters != null)
			{
				let regExp = new RegExp("[^" + this.allowedCharacters + "]+", "g");
				value = value.replace(regExp, "");
			}
			
			return value;
		}
	}	
}
