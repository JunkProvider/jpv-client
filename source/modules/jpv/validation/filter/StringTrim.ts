/// <reference path="../SynchroneFilterBase.ts" />

module JPV.Validation.Filter
{
	export class StringTrim
		extends SynchroneFilterBase
		implements SynchroneFilter<string>
	{
		filter(value: string)
		{
			return value.trim();
		}
	}
}
