/// <reference path="../View.ts" />

module JPV.View.Window
{
	import Button = JPV.View.Button.Button;
	
	class WindowHeadButtonList extends View
	{
		constructor()
		{
			super(document.createElement("div"));
			this.classes.add("window-head-buttons");	
		}
		
		setButtons(buttons: Button[])
		{
			this.clear();
			for (var button of buttons)
			{
				this.append(button);	
			}
		}
		
		addButton(button: Button)
		{
			this.append(button);	
		}
	}
	
	export class WindowHead extends View
	{
		private caption: HTMLSpanElement;
		private buttonList: WindowHeadButtonList;
		
		constructor(caption: string, buttons: Button[] = [])
		{
			super(document.createElement("div"));
			this.classes.add("window-head");
			
			// Caption
			this.append(this.caption = document.createElement("span"));
			this.caption.classList.add("window-head-caption");
			this.caption.textContent = caption;
			
			// Buttons
			this.append(this.buttonList = new WindowHeadButtonList());
			this.buttonList.setButtons(buttons);
		}
		
		/**
		 * Adds a button to the button list.
		 */
		addButton(button: Button)
		{
			this.buttonList.addButton(button);	
		}
	}
}
