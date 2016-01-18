module JPV.Timing
{
	export interface TimerCallback
	{
		(): void;		
	}
	
	export class Timer
	{
		private timeout: number;
		private periodic: boolean;
		private callback: TimerCallback;
		
		private intervalId: number = null;
	
		constructor(timeout: number, periodic: boolean, callback: TimerCallback)
		{
			this.timeout = timeout;
			this.periodic = periodic;
			this.callback = callback;
		}
		
		start()
		{
			this.stop();
			this.intervalId = window.setInterval(() => this.elapsed(), this.timeout);
		}
		
		stop()
		{
			if (this.intervalId != null)
			{
				window.clearInterval(this.intervalId);	
				this.intervalId = null;
			}
		}
		
		private elapsed()
		{
			if (!this.periodic)
				this.stop();

			this.callback();
		}
	}
}
