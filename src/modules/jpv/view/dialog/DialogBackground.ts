/// <reference path="../View.ts" />

module JPV.View.Dialog
{
	export class DialogBackground extends View
	{
		constructor()
		{
			super(document.createElement("div"));
			this.classes.add("dialog-background");
		}
	}
}
