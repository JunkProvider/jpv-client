module JPV.Culture
{
	export interface Culture extends NumberFormatter
	{
		// Text
		translate(label: string): string;
		
		// Number
		getNumberCharacters(float: boolean, negative: boolean): string;
		parseNumber(value: string): number;
	}	
}
