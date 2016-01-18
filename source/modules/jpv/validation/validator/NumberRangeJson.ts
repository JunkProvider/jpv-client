module JPV.Validation.Validator
{
	export interface NumberRangeJson extends Factory.SynchroneValidatorJson
	{	
		min: number;
		minInclusive: boolean;
		max: number;
		maxInclusive: boolean;
	}
}
