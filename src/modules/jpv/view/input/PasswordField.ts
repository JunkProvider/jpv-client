/// <reference path="TextInput" />

module JPV.View.Input
{
	export class PasswordField extends TextInput
	{	
		constructor()
		{
			super(document.createElement("input"));
			this.htmlElement.type = "password";
		}
	}	
}
