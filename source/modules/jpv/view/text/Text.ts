/// <reference path="../View.ts" />

module JPV.View.Text
{
	export class Text extends View
	{
		constructor(content: string, css: string = null)
		{
			super(document.createElement("span"));
			this.htmlElement.textContent = content;
			if (css != null)
			{
				this.htmlElement.classList.add(css);	
			}
		}
		
		setContent(content: string)
		{
			this.htmlElement.textContent = content;	
		}
		
		setDisplayed(displayed: boolean)
		{
			this.htmlElement.style.display = displayed ? "" : "none";	
		}
	}
}
