/// <reference path="Column.ts" />
/// <reference path="SortMode.ts" />
/// <reference path="../TextAlign.ts" />
/// <reference path="../../culture/BasicNumberFormatter.ts" />

module JPV.View.DataTable
{
	export interface GetNumberValueFunction<T>
	{
		(entry: T): number;
	}

	export class NumberColumn<EntryType> implements Column<EntryType>
	{
		private heading: string;
		private getValue: GetNumberValueFunction<EntryType>;
		private numberFormatter: Culture.NumberFormatter;
		private decimalPlaces: number;
		private _sortable: boolean;
		private _width: number;
		
		get sortable() { return this._sortable; }
		get width() { return this._width; }
		
		constructor(
			heading: string,
			width: number,
			getValue: GetNumberValueFunction<EntryType>,
			numberFormatter: Culture.NumberFormatter = null,
			decimalPlaces: number = 2,
			sortable: boolean = true
		)
		{
			if (numberFormatter == null)
				numberFormatter = new Culture.BasicNumberFormatter();
			
			this.heading = heading;
			this._width = width;
			this.getValue = getValue;
			this.numberFormatter = numberFormatter;
			this.decimalPlaces = decimalPlaces;
			this._sortable = sortable;
		}
		
		customizeTH(th: HTMLTableHeaderCellElement)
		{
			th.textContent = this.heading;
			th.appendChild(document.createElement("span"));
		}
		
		customizeTD(td: HTMLTableCellElement, entry: EntryType)
		{
			td.textContent = this.numberFormatter.formatNumber(this.getValue(entry), this.decimalPlaces);
			td.style.textAlign = TextAlign.RIGHT;
		}
		
		sort(entries: EntryType[], mode: SortMode)
		{
			entries.sort((a, b) => mode.sign * (this.getValue(a) - this.getValue(b)));	
		}
	}		
}
