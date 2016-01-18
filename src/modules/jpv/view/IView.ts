/// <reference path="ClassList.ts" />

module JPV.View
{
	export interface IView
	{
		htmlElement: HTMLElement;
		dispose(): void;
	}
}
