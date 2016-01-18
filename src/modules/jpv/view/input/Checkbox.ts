/// <reference path="../View" />

module JPV.View.Input
{
	export class Checkbox extends View implements IInput<boolean> 
	{
		valueChangedEvent = new Event.Event<boolean>();
		get htmlElement() { return <HTMLInputElement>this._htmlElement; }

		constructor()
		{
			super(document.createElement("input"));
			this.htmlElement.type = "checkbox";
			this.classes.add("checkbox");
			this.htmlElement.onchange = () => {
				this.valueChangedEvent.trigger(this, true);
			}
		}
		
		getValue()
		{
			return this.htmlElement.checked;	
		}
		
		setValue(value: boolean)
		{
			const prevValue = this.htmlElement.checked;
			if (value == prevValue)
				return;
			
			this.htmlElement.checked = value;
			this.valueChangedEvent.trigger(this, false);
		}
	}	
}
