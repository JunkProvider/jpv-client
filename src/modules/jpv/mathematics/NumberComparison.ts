/// <reference path="../collection/Map.ts" />

module JPV.Mathematics
{
	export interface CompareFunction
	{
		(a: number, b: number): boolean;		
	}
	
	export class NumberComparison
	{
		private static all: NumberComparison[] = [];
		private static allById = new Collection.Map<NumberComparison>();
		
		static getAll()
		{
			return NumberComparison.all;
		}
		
		static getById(id: number)
		{
			return NumberComparison.allById.get(id);
		}
		
		static EQUAL = new NumberComparison(1, (a, b) => a == b);
		static NOT_EQUAL = new NumberComparison(1, (a, b) => a != b);
		static GEATER = new NumberComparison(3, (a, b) => a > b);
		static GEATER_OR_EQUAL = new NumberComparison(4, (a, b) => a >= b);
		static LESS = new NumberComparison(5, (a, b) => a < b);
		static LESS_OR_EQUAL = new NumberComparison(6, (a, b) => a <= b);

		private _id: number;
		private compareFunction: CompareFunction;
		get id() { return this._id; }
		
		constructor(id: number, compareFunction: CompareFunction)
		{
			this._id = id;
			this.compareFunction = compareFunction;
		}
		
		compare(a: number, b: number)
		{
			return this.compareFunction(a, b);	
		}
	}	
}
