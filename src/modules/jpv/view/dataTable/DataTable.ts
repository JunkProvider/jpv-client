/// <reference path="Column.ts" />
/// <reference path="SortMode.ts" />

module JPV.View.DataTable
{
	export class DataTableRow<T> implements Row<T>
	{
		clickedEvent = new JPV.Event.Event<void>();
		
		private _entry: T;
		private _tableRow: HTMLTableRowElement;
		
		get entry() { return this._entry; }
		get tableRow() { return this._tableRow; }
		
		constructor(tableRow: HTMLTableRowElement, entry: T, columns: Column<T>[], columnWidths: string[])
		{
			this._entry = entry;
			var tr = this._tableRow = tableRow;
			
			for (var i = 0, len = columns.length; i < len; i++)
			{
				var td = document.createElement("td");
				columns[i].customizeTD(td, entry);
				td.style.width = columnWidths[i];
				tr.appendChild(td);
			}
			
			tr.onclick = (event: MouseEvent) => this.clickedEvent.trigger(this, null);
		}
	}
	
	class DataTableHeading<T>
	{
		clickedEvent = new JPV.Event.Event<void>();
		
		private _column: Column<T>;
		private _tableHeading: HTMLTableHeaderCellElement;
		private sortMode: SortMode = null;
	
		get column() { return this._column; }
		get tableHeading() { return this._tableHeading; }
		
		constructor(tableHeading: HTMLTableHeaderCellElement, column: Column<T>, width: string)
		{
			this._column = column;	
			var th = this._tableHeading = tableHeading;
			
			column.customizeTH(th);
			th.style.width = width;
			if (column.sortable)
			{
				th.classList.add("sortable");
				th.title = "Click to sort";	
			}
			
			th.onclick = () => this.clickedEvent.trigger(this, null);
		}
		
		getSort()
		{
			return this.sortMode;	
		}
		
		setSort(mode: SortMode)
		{
			this.sortMode = mode;
			
			var th = this.tableHeading;
			
			// Update style
			if (mode == null)
			{
				th.classList.remove("sort-asc");
				th.classList.remove("sort-desc");
			}
			else if (mode == SortMode.ASC)
			{
				th.classList.remove("sort-desc");
				th.classList.add("sort-asc");
			}
			else if (mode == SortMode.DESC)
			{
				th.classList.remove("sort-asc");
				th.classList.add("sort-desc");
			}
		}
	}
	
	/**
	 * A simple but powerful table class.
	 */
	export class DataTable<EntryType>
	{
		/**
		 * Is triggered when the user clicked a table row.
		 */
		rowClickedEvent = new JPV.Event.Event<Row<EntryType>>();
		
		private containerDiv: HTMLDivElement;
		private containerHeadDiv: HTMLDivElement;
		private containerCaptionSpan: HTMLSpanElement;
		private containerButtonsDiv: HTMLDivElement;
		private table: HTMLTableElement;
		private tableHead: HTMLTableSectionElement;
		private tableHeadRow: HTMLTableRowElement;
		private tableBody: HTMLTableSectionElement;
		
		private columns: Column<EntryType>[] = [];
		private entries: EntryType[] = [];
		
		private headings: DataTableHeading<EntryType>[] = [];
		private sortHeading: DataTableHeading<EntryType> = null;
		
		constructor(parentElement: HTMLElement)
		{
			// Create HTML elements	
			this.containerDiv = document.createElement("div");
			this.containerHeadDiv = document.createElement("div");
			this.containerCaptionSpan = document.createElement("span");
			this.containerButtonsDiv = document.createElement("div");
			this.table = document.createElement("table");
			this.tableHead = document.createElement("thead");
			this.tableHeadRow = document.createElement("tr");
			this.tableBody = document.createElement("tbody");
			
			// cutomize HTML elements
			this.containerDiv.classList.add("data-table-container");
			this.containerHeadDiv.classList.add("data-table-container-head");
			this.containerCaptionSpan.classList.add("data-table-caption");
			this.containerButtonsDiv.classList.add("data-table-buttons");
			this.table.classList.add("data-table");
			
			// Append HTML elements
			this.tableHead.appendChild(this.tableHeadRow);
			this.table.appendChild(this.tableHead);
			this.table.appendChild(this.tableBody);
			this.containerHeadDiv.appendChild(this.containerCaptionSpan);
			this.containerHeadDiv.appendChild(this.containerButtonsDiv);
			this.containerDiv.appendChild(this.containerHeadDiv);
			this.containerDiv.appendChild(this.table);
			parentElement.appendChild(this.containerDiv);
		}
		
		/**
		 * Sets the columns.
		 */
		setColumns(columns: Column<EntryType>[])
		{
			this.columns = columns;
			this.updateHead();
			this.updateBody();
		}
		
		/**
		 * Sets the entries.
		 */
		setEntries(entries: EntryType[])
		{
			if (this.sortHeading != null)
			{
				this.sortHeading.column.sort(entries, this.sortHeading.getSort());	
			}
			
			this.entries = entries;
			
			this.updateBody();
		}
		
		/**
		 * Sets the sort.
		 */
		setSort(column: Column<EntryType>, mode: SortMode)
		{
			var heading = this.getHeadingByColumn(column);
			this.setSortHeading(heading, mode);	
		}
		
		/**
		 * Sets the caption.
		 */
		setCaption(caption: string)
		{
			this.containerCaptionSpan.textContent = caption;	
		}
		
		/**
		 * Adds the given buttons to the table head.
		 */
		addButtons(buttons: Button.Button[])
		{
			for (var button of buttons)
			{
				button.appendTo(this.containerButtonsDiv);
			}
		}
		
		/**
		 * Is executed when the user clicked a table heading.
		 */
		private onHeadingClicked(heading: DataTableHeading<EntryType>)
		{
			if (heading.column.sortable)
			{
				this.setSortHeading(heading, this.getNextSortMode(heading.getSort()));
			}
		}
		
		/**
		 * Is executed when the user clicked a table row.
		 */
		private onRowClicked(row: DataTableRow<EntryType>)
		{
			this.rowClickedEvent.trigger(this, row);
		}
		
		/**
		 * Sets the heading for which the table should be sorted.
		 */
		private setSortHeading(heading: DataTableHeading<EntryType>, mode: SortMode)
		{
			if (mode == null)
			{
				throw new Error("Could not set sort heading. Sort mode can't be null.");	
			}
			
			if (this.sortHeading != null)
			{
				this.sortHeading.setSort(null);	
			}
			
			this.sortHeading = heading;
			
			if (heading != null)
			{
				if (!heading.column.sortable)
				{
					throw new Error("Could not set sort heading. The given column is not sortable.");
				}
				
				heading.setSort(mode);
				heading.column.sort(this.entries, mode);
			}
			
			this.sortHeading = heading;
			
			if (heading != null)
			{
				this.updateBody();
			}
		}
		
		/**
		 * Updates the table head recreating the table heading elements.
		 */
		private updateHead()
		{
			var tr = this.tableHeadRow;
			var columns = this.columns;
			
			// Clean table headings
			var childNode: Node = null;	
			while ((childNode = tr.lastChild) != null)
			{
				tr.removeChild(childNode);
			}
			this.sortHeading = null
			this.headings.length = 0;
			
			var columnWidths = this.getColumnWidths(columns);
			
			// Create new table headings
			for (var i = 0, len = columns.length; i < len; i++)
			{
				var th = document.createElement("th");
				var heading = new DataTableHeading(th, columns[i], columnWidths[i]);
				heading.clickedEvent.add(this, this.onHeadingClicked);
				this.headings.push(heading);
				tr.appendChild(th);	
			}
		}
		
		/**
		 * Updates the table body recreating the table row elements.
		 */
		private updateBody()
		{
			var tbody = this.tableBody;
			var columns = this.columns;
			
			// Clean table rows
			var childNode: Node = null;	
			while ((childNode = tbody.lastChild) != null)
			{
				tbody.removeChild(childNode);
			}
			
			var columnWidths = this.getColumnWidths(this.columns);
			
			// Create new table rows
			for (var entry of this.entries)
			{
				var row = new DataTableRow(document.createElement("tr"), entry, columns, columnWidths);	
				row.clickedEvent.add(this, this.onRowClicked);
				tbody.appendChild(row.tableRow);
			}
		}
		
		/**
		 * Gets the sort mode which should be used as nest sort mode
		 * when the given sort mode is currently used.
		 */
		private getNextSortMode(currentMode: SortMode)
		{
			if (currentMode == SortMode.ASC)
				return SortMode.DESC;
			
			return SortMode.ASC;
		}
		
		/**
		 * Gets the heading for the given column.
		 */
		private getHeadingByColumn(column: Column<EntryType>)
		{
			for (var heading of this.headings)
			{
				if (heading.column == column)
					return heading;	
			}	
			
			throw new Error("Could not get heading for columns. No heading found for the given column.");
		}
		
		/**
		 * Gets the columns widhts as strings.
		 */
		private getColumnWidths(columns: Column<EntryType>[])
		{
			var sum = 0;
			for (var column of columns)
				sum += column.width;
			
			var widths: string[] = [];
			for (var column of columns)
				widths.push(column.width / sum + "%");
			
			return widths;
		}
	}		
}
