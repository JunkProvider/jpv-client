/// <reference path="Button.ts" />

module JPV.View.Button
{
	export class ImageButton extends Button
	{
		private image: HTMLImageElement;
		
		constructor(src: string, title: string = null, cssClass: string = null)
		{
			super();
			
			// Create HTML elements
			this.image = document.createElement("img");
			
			// Customize HTML elements
			this.classes.add("image-button");
			if (cssClass != null)
			{
				this.classes.add(cssClass);
			}
			this.image.src = src;
			if (title != null)
			{
				this.image.title = title;
			}
			
			// Append HTML elements
			this.append(this.image);
		}
	}
}
