/// <reference path="../View.ts" />

module JPV.View.Structure
{
	export class FieldSet extends View
	{
		private tableBody: HTMLTableSectionElement;
		
		constructor(caption: string = null, cssClass: string = null)
		{
			super(document.createElement("div"));
			this.classes.add("field-set");
			
			// Create caption
			if (caption != null)
			{
				var captionSpan = document.createElement("div");
				captionSpan.classList.add("field-set-caption");
				captionSpan.textContent = caption;
				this.append(captionSpan);
			}
			
			// Create table
			var table = document.createElement("table");
			var tableBody = this.tableBody = document.createElement("tbody");
			table.appendChild(tableBody);
			this.append(table);
			
			// Add css
			if (cssClass != null)
			{
				this.classes.add(cssClass);	
			}
		}
		
		addField(name: string, element: View)
		{
			// Create HTML elements
			var tr = document.createElement("tr");
			var td1 = document.createElement("td");
			var td2 = document.createElement("td"); 
			
			// Customize HTML elements
			td1.textContent = name;
			element.appendTo(td2);
			
			// Append HTML elements
			tr.appendChild(td1);
			tr.appendChild(td2);
			this.tableBody.appendChild(tr);
		}

		clear()
		{
			super.clear();
		}
	}
}
