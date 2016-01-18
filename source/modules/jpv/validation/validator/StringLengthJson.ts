module JPV.Validation.Validator
{
	export interface StringLengthJson extends Factory.SynchroneValidatorJson
	{
		min: number;
		max: number;		
	}
}
