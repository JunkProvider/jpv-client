module JPV.Validation.Factory
{
	export interface SynchroneFilterFactory
	{
		produce(json: any): SynchroneFilter<any>;
	}	
}
