module JPV.Geometry
{
	export class Point
	{
		private _x: number;
		private _y: number;
		
		get x() { return this._x; }
		get y() { return this._y; }
		
		constructor(x: number, y: number)
		{
			this._x = x;
			this._y = y;
		}
		
		add(point: Point)
		{
			return this.move(point.x, point.y);
		}
		
		move(x: number, y: number)
		{
			return new Point(this._x + x, this._y + y);	
		}
		
		equals(point: Point)
		{
			if (point == null)
				return false;
			
			return point._x == this._x && point._y == this._y;
		}
		
		toString()
		{
			return "Point(" + this._x + ", " + this._y + ")";	
		}
	}	
}
