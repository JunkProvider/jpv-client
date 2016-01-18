/// <reference path="Column.ts" />
/// <reference path="SortMode.ts" />
/// <reference path="../TextAlign.ts" />

module JPV.View.DataTable
{
	export class TextColumn<EntryType> implements Column<EntryType>
	{
		private heading: string;
		private getValue: GetStringValueFunction<EntryType>;
		private _sortable: boolean;
		private _width: number;
		
		get sortable() { return this._sortable; }
		get width() { return this._width; }
		
		constructor(
			heading: string,
			width: number,
			getValue: GetStringValueFunction<EntryType>,
			sortable: boolean = true
		)
		{
			this.heading = heading;
			this._width = width;
			this.getValue = getValue;
			this._sortable = sortable;
		}
		
		customizeTH(th: HTMLTableHeaderCellElement)
		{
			th.textContent = this.heading;
			th.appendChild(document.createElement("span"));
		}
		
		customizeTD(td: HTMLTableCellElement, entry: EntryType)
		{
			td.textContent = this.getValue(entry);
			td.style.textAlign = TextAlign.LEFT;
		}
		
		sort(entries: EntryType[], mode: SortMode)
		{
			entries.sort((a, b) => mode.sign * (this.getValue(a) > this.getValue(b) ? 1 : -1));	
		}
	}		
}
