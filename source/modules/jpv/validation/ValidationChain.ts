/// <reference path="../event/Event.ts" />

module JPV.Validation
{
	export class ValidationChain<T>
	{
		changedEvent = new Event.Event<void>();
		
		private _items: ValidityItem<T>[] = [];
		
		get items() { return this._items; }
		
		constructor(items: ValidityItem<T>[] = [])
		{
			this._items = items;
		}
		
		getFilteredItems(filter: (item: ValidityItem<T>) => boolean)
		{
			let items = this.items;
			let filteredItems: ValidityItem<T>[] = [];
			for (let item of items)
			{
				if (filter(item))
					filteredItems.push(item);	
			}
			
			return filteredItems;
		}
		
		addSynchroneFilter(filter: SynchroneFilter<T>)
		{
			this._items.push(new SynchroneFilterItem(filter));
		}
		
		addSynchroneValidator(validator: SynchroneValidator<T>)
		{
			this._items.push(new SynchroneValidatorItem(validator));
		}
		
		addItem(item: ValidityItem<T>)
		{
			this._items.push(item);
		}
	}
}
