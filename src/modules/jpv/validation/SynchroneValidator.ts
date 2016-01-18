module JPV.Validation
{
	export interface SynchroneValidator<T> extends ValidationElement
	{
		stopIfInvalid: boolean;
		text: string;
		isValid(value: T): boolean;
		isSynchroneValidator(): boolean;
	}
}
