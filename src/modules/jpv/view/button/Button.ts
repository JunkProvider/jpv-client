/// <reference path="../View.ts" />

module JPV.View.Button
{
	export class Button extends View
	{
		clickedEvent = new JPV.Event.Event<void>();
		
		private displayed: boolean = true;
		private enabled: boolean = true;
		private pressed: boolean = false;
		
		constructor()
		{
			super(document.createElement("div"))
			this.htmlElement.onclick = () => this.onClicked();
		}
		
		isDisplayed()
		{
			return this.displayed;	
		}
		
		setDisplayed(displayed: boolean)
		{
			this.htmlElement.style.display = displayed ? "" : "none";	
		}
		
		isEnabled()
		{
			return this.enabled;	
		}
		
		setEnabled(enabled: boolean)
		{
			if (enabled == this.enabled)
				return;

			this.enabled = enabled;
			this.classes.swich("disabled", !enabled);
		}
		
		isPressed()
		{
			return this.pressed;	
		}
		
		setPressed(pressed: boolean)
		{
			if (pressed == this.pressed)
				return;

			this.pressed = pressed;
			this.classes.swich("pressed", pressed);
		}
		
		protected onClicked()
		{
			if (this.enabled)
			{
				this.clickedEvent.trigger(this, null);
			}	
		}
	}
}
