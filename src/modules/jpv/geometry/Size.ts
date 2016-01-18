module JPV.Geometry
{
	export class Size
	{
		private _width: number;
		private _height: number;
		
		get width() { return this._width; }
		get height() { return this._height; }
		
		constructor(width: number, height: number)
		{
			this._width = width;
			this._height = height;
		}
		
		toString()
		{
			return "Size(" + this._width + ", " + this._height + ")";	
		}
	}	
}
