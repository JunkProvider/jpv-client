module JPV.Event
{
	export class EventListener<T>
	{
		context: Object;
		handler: EventHandler<T>;
		
		constructor(context: Object, handler: EventHandler<T>)
		{
			this.context = context;
			this.handler = handler;
		}
	}
	
	export interface EventHandler<T>
	{
		(sender: Object, data: T): void;
	}
	
	export class Event<T>
	{
		private listeners: EventListener<T>[] = [];
		
		add(context: Object, handler: EventHandler<T>)
		{
			this.listeners.push(new EventListener<T>(context, handler));
		}
		
		trigger(sender: Object, data: T)
		{
			var listeners = this.listeners;
			for (var listener of this.listeners)
			{
				listener.handler.call(listener.context, sender, data);
			}
		}
		
		remove(context: Object, handler: EventHandler<T>)
		{
			var listeners = this.listeners;
			for (var i = 0; i < listeners.length; i++) {
				if (listeners[i].context == context && listeners[i].handler == handler) {
					this.listeners.slice(i, 1);	
					return true;
				}
			}
			return false;
		}
	}
}
