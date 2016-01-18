/// <reference path="../View" />
/// <reference path="../../color/Color" />

module JPV.View.Input
{
	export class ColorField extends View implements IInput<Color.Color> 
	{
		valueChangedEvent = new Event.Event<boolean>();

		get htmlElement() { return <HTMLInputElement>this._htmlElement; }
		
		constructor()
		{
			super(document.createElement("input"));
			this.htmlElement.type = "color";
			this.htmlElement.onchange = () => {
				this.valueChangedEvent.trigger(this, true);
			}
		}

		getValue()
		{
			return Color.Color.createFromHexString(this.htmlElement.value);	
		}
		
		setValue(value: Color.Color)
		{
			const prevValue = Color.Color.createFromHexString(this.htmlElement.value);
			if (value.equals(prevValue))
				return;
			
			this.htmlElement.value = value.toHexString();
			this.valueChangedEvent.trigger(this, false);
		}
	}	
}
