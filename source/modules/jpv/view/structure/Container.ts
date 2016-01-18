/// <reference path="../View.ts" />

module JPV.View.Structure
{
	export class Container extends View
	{
		get htmlElement() { return this._htmlElement; }
		
		constructor(cssClass: string = null)
		{
			super(document.createElement("div"));
			
			if (cssClass != null)
			{
				this.classes.add(cssClass);	
			}
		}
		
		append(child: View | HTMLElement)
		{
			super.append(child);
		}

		clear()
		{
			super.clear();
		}
	}
}
