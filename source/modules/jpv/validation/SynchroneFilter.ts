module JPV.Validation
{
	export interface SynchroneFilter<T> extends ValidationElement
	{
		text: string;
		filter(value: T): T;
		isSynchroneFilter(): boolean;
	}
}
