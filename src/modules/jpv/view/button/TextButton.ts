/// <reference path="Button.ts" />

module JPV.View.Button
{
	export class TextButton extends Button
	{
		private span: HTMLSpanElement;
		
		constructor(title: string, cssClass: string = null)
		{
			super();
			
			// Create HTML elements
			this.span = document.createElement("span");
			
			// Customize HTML elements
			this.classes.add("text-button");
			if (cssClass != null)
			{
				this.classes.add(cssClass);
			}
			this.span.textContent = title;
			
			// Append HTML elements
			this.append(this.span);
		}
	}
}
