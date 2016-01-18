/// <reference path="Method.ts" />

module JPV.Ajax
{
	interface AjaxResponse
	{
		exception?: { message: string; file: string; line: string; };
		data?: any;
		buffer?: string;
	}

	export class Request<ResponseDataType>
	{
		private controller: string;
		private action: string;
		private parameters: any[];
		private method: string;
		private callback: (data: ResponseDataType) => void;
		
		private jqRequest: JQueryXHR = null;
		private wasSend = false;
		
		constructor(
			controller: string,
			action: string,
			parameters: any[],
			method: string,
			callback: (data: ResponseDataType) => void
		)
		{
			this.controller = controller;
			this.action = action;
			this.parameters = parameters;
			this.method = method;
			this.callback = callback;
		}
		
		send()
		{
			if (this.wasSend)
				throw new Error("Could not send request, the request was already send.");
			
			var successCallback =
			(data: string, textStatus: string, jqXHR: JQueryXHR) => 
			{
				var response: AjaxResponse = null;
				try
				{
					response = JSON.parse(data);
				}	
				catch (error)
				{
					throw new Error("Could not parse data \"" + data + "\". " + error.message);
				}	
					
				if (response.exception != null)
				{
					throw new Error(response.exception.message);
				}
					
				if (response.buffer != null && response.buffer.length != 0)
				{
					throw new Error(response.buffer);
				}
					
				this.callback(response.data);
			};
			
			var errorCallback =
			(jqXHR: JQueryXHR, textStatus: string, errorThrown: string) => {
				throw new Error(errorThrown);
			};
			
			var settings: JQueryAjaxSettings = {
				url: "",
				// TODO: method: this.method,
				data:
				{
					c: this.controller,
					a: this.action,
					p: JSON.stringify(this.parameters)
				},
				success: successCallback,
				error: errorCallback
			}
			
			this.jqRequest = $.ajax("", settings);
			
			this.wasSend = true;
			return this;
		}
		
		abort()
		{
			this.jqRequest.abort();	
			return this;
		}
	}
}
