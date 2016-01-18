module JPV.Event
{
	export class Delegate<T extends Function>
	{
		private context: Object;
		private handler: T;
		
		constructor(context: Object, handler: T)
		{
			
		}

		call(...parameters: any[])
		{
			this.handler.call(this.context, parameters);
		}
	}
}
