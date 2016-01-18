module JPV.Validation
{
	export interface ValidityItem<T>
	{
		stateChangedEvent: Event.Event<void>;
		
		text: string;
		filtersValue: boolean;
		state: ValidityItemState;

		update(state: ValidationState<T>, callback: (state: ValidationState<T>) => void): void;
		cancelUpdate(): void;
		reset(): void;
	}
}
