module JPV.Color
{
	export class Color
	{
		static createFromHexString(hexString: string)
		{
			const color = new Color();	
			color.hexString = hexString;
			return color;
		}
		
		private hexString: string;
		
		toHexString()
		{
			return this.hexString;	
		}
		
		equals(color: Color)
		{
			return this.hexString == color.hexString;	
		}
	}
}
