module JPV.View
{
	export class ClassList
	{
		private classList: DOMTokenList;
		
		constructor(classList: DOMTokenList)
		{
			this.classList = classList;
		}
		
		add(cssClass: string)
		{
			if (cssClass == null || cssClass == "")
				return;
			
			this.classList.add(cssClass);	
		}
		
		remove(cssClass: string)
		{
			if (cssClass == null || cssClass == "")
				return;
			
			this.classList.remove(cssClass);	
		}
		
		toggle(cssClass: string)
		{
			if (cssClass == null || cssClass == "")
				return;
			
			this.classList.toggle(cssClass);	
		}
		
		swich(cssClass: string, enabled: boolean)
		{
			if (cssClass == null || cssClass == "")
				return;
			
			if (enabled)
			{
				this.classList.add(cssClass);	
			}
			else
			{
				this.classList.remove(cssClass);
			}
		}
	}
}
