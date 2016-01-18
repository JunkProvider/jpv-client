/// <reference path="../View.ts" />
/// <reference path="DialogBackground.ts" />

module JPV.View.Dialog
{
	export class DialogManager extends View
	{
		private background: DialogBackground;
		private dialogs: Dialog[] = [];
		
		constructor()
		{
			super(document.createElement("div"));
			this.classes.add("dialog-manager");
			
			this.background = new DialogBackground();
		}
		
		openDialog(dialog: Dialog)
		{
			dialog.closeButtonClickedEvent.add(this, this.onDialogCloseButtonClicked);
			
			this.dialogs.push(dialog);
			this.append(this.background);
			this.append(dialog);
		}
		
		closeDialog(dialog: Dialog)
		{
			dialog.closeButtonClickedEvent.remove(this, this.onDialogCloseButtonClicked);
			
			const index = this.dialogs.indexOf(dialog);
			this.dialogs.splice(index, 1);
			if (this.dialogs.length == 0)
			{
				this.background.remove();	
			}
			dialog.remove();
		}
		
		private onDialogCloseButtonClicked(dialog: Dialog)
		{
			this.closeDialog(dialog);	
		}
	}
}
