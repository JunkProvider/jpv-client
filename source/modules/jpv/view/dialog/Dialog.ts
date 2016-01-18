/// <reference path="../View.ts" />
/// <reference path="../window/WindowHead.ts" />
/// <reference path="../structure/Container.ts" />
/// <reference path="../button/ImageButton.ts" />
/// <reference path="DialogButtonList.ts" />

module JPV.View.Dialog
{
	export class Dialog extends View
	{
		closeButtonClickedEvent = new JPV.Event.Event<void>();
		
		protected head: Window.WindowHead;
		protected content: Structure.Container;
		protected buttonList: DialogButtonList;
		protected overlay: View = null;
		protected closeButton: Button.Button = null;
		
		private enabled: boolean = true;
		
		constructor(caption: string, closeButton: boolean = true)
		{
			super(document.createElement("div"));
			this.classes.add("dialog");
			
			// Window head
			this.append(this.head = new Window.WindowHead(caption));
			this.head.addButton(
				this.closeButton = new Button.ImageButton(
					"images/close.svg",
					"Close dialog",
					"close-dialog-button"
				)
			);
			this.closeButton.clickedEvent.add(this, this.onCloseButtonClicked);
			
			// Window content
			this.append(this.content = new Structure.Container());
			this.content.addClass("dialog-content");
			
			// Window button list
			this.append(this.buttonList = new DialogButtonList());
			
			this.overlay = new View(document.createElement("div"));
			this.overlay.addClass("dialog-overlay");
			
			this.setCloseButtonDisplayed(closeButton);
		}
		
		setSize(width: string, height: string)
		{
			this.htmlElement.style.width = width;
			this.htmlElement.style.height = height;	
		}
		
		setPosition(x: string, y: string)
		{
			this.htmlElement.style.left = x;
			this.htmlElement.style.top = y;	
		}
		
		setEnabled(enabled: boolean)
		{
			if (enabled == this.enabled)
				return;
			
			if (enabled)
			{
				this.overlay.remove();
			}
			else
			{
				this.append(this.overlay);
			}
			
			this.enabled = enabled;
		}
		
		setCloseButtonDisplayed(displayed: boolean)
		{
			this.closeButton.setDisplayed(displayed);
		}
		
		protected onCloseButtonClicked()
		{
			this.closeButtonClickedEvent.trigger(this, null);
		}
	}
}
