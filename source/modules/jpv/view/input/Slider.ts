/// <reference path="../View" />

module JPV.View.Input
{
	export class Slider extends View implements IInput<number> 
	{
		valueChangedEvent = new Event.Event<boolean>();

		get htmlElement() { return <HTMLInputElement>this._htmlElement; }
		
		constructor()
		{
			super(document.createElement("input"));
			this.htmlElement.type = "range";
			this.htmlElement.onchange = () => {
				this.valueChangedEvent.trigger(this, true);
			}
		}
		
		setRange(range: Geometry.Range)
		{
			this.htmlElement.min = range.min.toString();
			this.htmlElement.max = range.max.toString();
			this.valueChangedEvent.trigger(this, false);
		}
		
		setStep(step: number)
		{
			this.htmlElement.step = step.toString();
			this.valueChangedEvent.trigger(this, false);
		}

		getValue()
		{
			return parseFloat(this.htmlElement.value);
		}
		
		setValue(value: number)
		{
			const prevValue = parseFloat(this.htmlElement.value);
			if (value == prevValue)
				return;
			
			this.htmlElement.value = value.toString();
			this.valueChangedEvent.trigger(this, false);
		}
	}	
}
