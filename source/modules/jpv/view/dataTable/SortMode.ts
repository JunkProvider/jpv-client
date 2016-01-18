module JPV.View.DataTable
{
	export class SortMode
	{
		static ASC = new SortMode(1);
		static DESC = new SortMode(-1);
		
		private _sign: number;
		
		get sign() { return this._sign; }
		
		constructor(sign: number)
		{
			this._sign = sign;	
		}
	}		
}
