module JPV.View.Input
{
	export interface IInput<Value> extends IView
	{
		valueChangedEvent: Event.Event<boolean>;
		getValue(): Value;
		setValue(value: Value): void;
	}
}
