module JPV.Validation.Factory
{
	export interface SynchroneValidatorFactory
	{
		produce(json: any): SynchroneValidator<any>;
	}	
}
