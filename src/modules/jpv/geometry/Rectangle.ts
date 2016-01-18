/// <reference path="Point.ts" />
/// <reference path="Size.ts" />

module JPV.Geometry
{
	export class Rectangle
	{
		private _x: number;
		private _y: number;
		private _width: number;
		private _height: number;
		
		get x() { return this._x; }
		get y() { return this._y; }
		get width() { return this._width; }
		get height() { return this._height; }
		
		get position()
		{
			return new Point(this._x, this._y);	
		}
		
		constructor(x: number, y: number, width: number, height: number)
		{
			this._x = x;
			this._y = y;
			this._width = width;
			this._height = height;
		}
		
		move(x: number, y: number)
		{
			return new Rectangle(this._x + x, this._y + y, this._width, this._height);	
		}
		
		toString()
		{
			return "Rectangle(" + this._x + ", " + this._y + ", " + this._width + ", " + this._height +  ")";	
		}
	}	
}
