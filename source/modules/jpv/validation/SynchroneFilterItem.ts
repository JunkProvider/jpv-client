/// <reference path="ValidityItemBase.ts" />
/// <reference path="SynchroneFilter.ts" />

module JPV.Validation
{
	export class SynchroneFilterItem<T>
		extends ValidityItemBase<T>
		implements ValidityItem<T>
	{
		private filter: SynchroneFilter<T>;
		
		constructor(filter: SynchroneFilter<T>)
		{
			super(filter.text, true);
			this.filter = filter;	
		}
		
		update(validationState: ValidationState<T>, callback: (state: ValidationState<T>) => void)
		{
			if (validationState.interrupted)
			{
				this.setState(ValidityItemState.NOT_CHECKED);
				callback(validationState);
				return;
			}
			
			let filteredValue = this.filter.filter(validationState.value);
			let filtered = filteredValue != validationState.value;
			let state: ValidityItemState;
			
			if (filtered)
			{
				state = ValidityItemState.WILL_FILTER;	
				validationState.value = filteredValue;
				validationState.filtered = filtered;
			}
			else
			{
				state = ValidityItemState.WILL_NOT_FILTER;
			}
			
			this.setState(state);
			
			callback(validationState);
		}
		
		cancelUpdate()
		{
			// Do nothing because this filter is not asynchrone	
		}
		
		reset()
		{
			this.setState(ValidityItemState.NOT_CHECKED);	
		}
	}
}
