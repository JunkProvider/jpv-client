/// <reference path="TextInput" />

module JPV.View.Input
{
	export class TextField extends TextInput
	{	
		constructor()
		{
			super(document.createElement("input"));
			this.htmlElement.type = "text";
		}
	}	
}
