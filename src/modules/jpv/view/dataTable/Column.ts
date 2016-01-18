/// <reference path="SortMode.ts" />

module JPV.View.DataTable
{
	export interface Column<EntryType>
	{
		width: number;
		sortable: boolean;
		customizeTH(th: HTMLTableHeaderCellElement): void;
		customizeTD(td: HTMLTableCellElement, entry: EntryType): void;
		sort?(entries: EntryType[], mode: SortMode): void;
	}	
}
