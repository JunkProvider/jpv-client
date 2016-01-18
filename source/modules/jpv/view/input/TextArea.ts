/// <reference path="TextInput" />

module JPV.View.Input
{
	export class TextArea extends TextInput
	{
		constructor()
		{
			// TODO: nicht casten, lösung finden
			super(<HTMLInputElement><any>document.createElement("textarea"));
		}
	}	
}
