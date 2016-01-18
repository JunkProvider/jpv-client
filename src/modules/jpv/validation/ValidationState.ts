module JPV.Validation
{
	export class ValidationState<T>
	{
		value: T = null;
		filtered: boolean = false;
		valid: boolean = true;
		interrupted: boolean = false;
		
		constructor(value: T)
		{
			this.value = value;	
		}
	}
}
