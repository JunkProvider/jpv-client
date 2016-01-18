module JPV.Validation
{
	export class ValidityItemState
	{
		
		static IN_PROGRESS = new ValidityItemState(false, "in-progress");
		static NOT_CHECKED = new ValidityItemState(false, "not-checked");
		static VALID = new ValidityItemState(true, "valid");
		static IVALID = new ValidityItemState(false, "invalid");
		static WILL_FILTER = new ValidityItemState(true, "will-filter");
		static WILL_NOT_FILTER = new ValidityItemState(true, "will-not-filter");
		
		private _valid: boolean;
		private _css: string;
		private _iconSrc: string;
		
		get valid() { return this._valid; }
		get css() { return this._css; }
		get iconSrc() { return this._iconSrc; }
		
		constructor(valid: boolean, css: string)
		{
			this._valid = valid;
			this._css = css;
			this._iconSrc = "images/" + css + ".png";
		}
	}
}
