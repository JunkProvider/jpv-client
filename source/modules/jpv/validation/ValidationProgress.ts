module JPV.Validation
{
	export class ValidationProgress<Value>
	{
		private items: ValidityItem<Value>[] = [];
		private callback: (state: ValidationState<Value>) => void;
		
		private running: boolean = false;
		private state: ValidationState<Value> = null;
		private currentItemIndex: number = 0;

		constructor(
			items: ValidityItem<Value>[],
			callback: (state: ValidationState<Value>) => void
		)
		{
			this.items = items;
			this.callback = callback;
		}
		
		start(state: ValidationState<Value>)
		{
			if (this.running)
				this.stop();
			
			this.running = true;
			
			for (let item of this.items)
			{
				item.reset();	
			}
			
			this.state = state;
			this.currentItemIndex = -1;
			
			this.updateNextItem();
		}
		
		stop()
		{
			if (!this.running)
				return;
			
			if (this.currentItemIndex != -1)
			{
				let currentItem = this.items[this.currentItemIndex];
				currentItem.cancelUpdate();
			}
			
			this.running = false;
		}
		
		private updateNextItem()
		{
			this.currentItemIndex++;
			
			// Call the callback and break if all items were updated
			if (this.currentItemIndex >= this.items.length)
			{
				this.callback(this.state);
				this.running = false;
				return;	
			}
			
			// Update the next item
			this.items[this.currentItemIndex].update(this.state, () => this.updateNextItem());
		}
	}
}
