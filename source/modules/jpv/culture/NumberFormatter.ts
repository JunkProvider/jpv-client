module JPV.Culture
{
	export interface NumberFormatter
	{
		formatNumber(value: number, decimalPlaces: number): string;	
	}
}
