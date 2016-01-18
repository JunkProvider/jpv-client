module JPV.Culture
{
	export class BasicNumberFormatter
	{
		formatNumber(value: number, decimalPlaces: number = null)
		{
			return value.toFixed(decimalPlaces);
		}
	}
}
