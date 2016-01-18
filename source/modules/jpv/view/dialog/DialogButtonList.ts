/// <reference path="../View.ts" />
/// <reference path="../structure/Container.ts" />

module JPV.View.Dialog
{
	export class DialogButtonList extends View
	{
		private leftContainer: Structure.Container;
		private rightContainer: Structure.Container;
		
		constructor()
		{
			super(document.createElement("div"));
			this.classes.add("dialog-buttons");
			
			this.append(this.leftContainer = new Structure.Container("left-dialog-buttons"));
			this.append(this.rightContainer = new Structure.Container("right-dialog-buttons"));
			this.append(new Structure.Container("clear-fix"));
		}
		
		addButtonLeft(button: Button.Button)
		{
			this.leftContainer.append(button);
		}
		
		addButtonRight(button: Button.Button)
		{
			this.rightContainer.append(button);
		}
	}
}
