/// <reference path="../event/Event.ts" />
/// <reference path="ValidityItemState.ts" />

module JPV.Validation
{
	export class ValidityItemBase<T>
	{
		stateChangedEvent = new Event.Event<void>();
		
		private _text: string;
		private _filtersValue: boolean;
		private _state: ValidityItemState = ValidityItemState.NOT_CHECKED;
		
		get text() { return this._text; }
		get filtersValue() { return this._filtersValue; }
		get state() { return this._state; }

		constructor(text: string, filtersValue: boolean)
		{
			this._text = text;	
			this._filtersValue = filtersValue;
		}
		
		protected setState(state: ValidityItemState)
		{
			if (state == this._state)
				return;
			
			this._state = state;
			this.stateChangedEvent.trigger(this, null);
		}
	}
}
