/// <reference path="Column.ts" />
/// <reference path="SortMode.ts" />
/// <reference path="../TextAlign.ts" />

module JPV.View.DataTable
{
	export interface GetStringValueFunction<T>
	{
		(entry: T): string;
	}
	
	export interface SortFunction<T>
	{
		(a: T, b: T): number;
	}
	
	export class StringColumn<EntryType> implements Column<EntryType>
	{
		private heading: string;
		private textAlign: string;
		private getValue: GetStringValueFunction<EntryType>;
		private sortFunction: SortFunction<EntryType>;
		private _width: number;
		
		get sortable() { return this.sortFunction != null; }
		get width() { return this._width; }
		
		constructor(
			heading: string,
			textAlign: string,
			width: number,
			getValue: GetStringValueFunction<EntryType>,
			sort: SortFunction<EntryType> = null
		)
		{
			this.heading = heading;
			this.textAlign = textAlign;
			this._width = width;
			this.getValue = getValue;
			this.sortFunction = sort;
		}
		
		customizeTH(th: HTMLTableHeaderCellElement)
		{
			th.textContent = this.heading;
			th.appendChild(document.createElement("span"));
		}
		
		customizeTD(td: HTMLTableCellElement, entry: EntryType)
		{
			td.textContent = this.getValue(entry);
			td.style.textAlign = this.textAlign;
		}
		
		sort(entries: EntryType[], mode: SortMode)
		{
			entries.sort((a, b) => mode.sign * this.sortFunction(a, b));	
		}
	}		
}
