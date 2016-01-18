/// <reference path="../View.ts" />

module JPV.View.Structure
{
	export class DescriptionList extends View
	{
		constructor(cssClass: string = null)
		{
			super(document.createElement("dl"));
			
			if (cssClass != null)
			{
				this.classes.add(cssClass);	
			}
		}
		
		addRow(name: string, value: View)
		{
			var dt = document.createElement("dt");
			var dd = document.createElement("dd");
			dt.textContent = name;
			value.appendTo(dd);
			this.append(dt);
			this.append(dd);
		}

		clear()
		{
			super.clear();
		}
	}
}
