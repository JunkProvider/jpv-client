/// <reference path="ClassList.ts" />

module JPV.View
{
	export class View implements IView
	{
		private _classes: ClassList;
		
		private parent: View = null;
		private children: View[] = [];
		protected _htmlElement: HTMLElement;
		
		get htmlElement() { return this._htmlElement; }
		get classes() { return this._classes; }

		constructor(htmlElement: HTMLElement)
		{
			this._htmlElement = htmlElement;	
			this._classes = new ClassList(htmlElement.classList);
		}
		
		dispose()
		{
			this.remove();	
		}
		
		appendTo(parent: View | HTMLElement)
		{
			if (parent instanceof View)
			{
				parent.appendView(this);
				return;	
			}
			
			if (parent instanceof HTMLElement)
			{
				parent.appendChild(this.htmlElement);
				return;
			}
			
			throw new Error("Could not append to given parent. Parent must be instance of html element or ui element.");
		}
		
		remove()
		{
			if (this.parent != null)
			{
				this.parent.removeView(this);
			}
			else
			{
				this.htmlElement.remove();
			}
		}
		
		addClass(cssClass: string)
		{
			this.classes.add(cssClass);	
		}

		protected append(child: View | HTMLElement)
		{
			if (child instanceof View)
			{
				this.appendView(child);
				return;	
			}
			
			if (child instanceof HTMLElement)
			{
				this.htmlElement.appendChild(child);
				return;
			}
			
			throw new Error("Could not append child. Child must be instance of html element or ui element.");
		}

		protected clear()
		{
			var children = this.children;
			var child: View = null;
			while (child = children.pop())
			{
				child.parent = null;
			}
			
			var node = this.htmlElement;
			var childNode: Node = null;	
			while (childNode = node.lastChild)
			{
				node.removeChild(childNode);
			}
		}
		
		private appendView(child: View)
		{
			if (child.parent != null)
				throw new Error("Could not append child. The child already has a parent.");
			
			this.children.push(child);
			child.parent = this;
			
			this.htmlElement.appendChild(child.htmlElement);
		}
		
		private removeView(child: View)
		{
			if (child.parent != this)
				throw new Error("Could not remove child. This is not the parent of the child.");
			
			child.parent = null;
			this.children.splice(this.children.indexOf(child), 1);
			
			child.remove();
		}
	}
}
