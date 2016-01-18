/// <reference path="Method.ts" />

module JPV.Ajax
{
	interface AjaxResponse
	{
		exception?: { message: string; file: string; line: string; };
		data?: any;
		buffer?: string;
	}

	export class AjaxService
	{
		callServerFunction<ReturnType>(controllerName: string, actionName: string, actionParameters: any[], method: string, callback: (returnValue: ReturnType) => void)
		{
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
					
				callback(response.data);
			};
			
			var errorCallback =
			(jqXHR: JQueryXHR, textStatus: string, errorThrown: string) => 
			{
				console.error(errorThrown);
			};
			
			var settings: any /*JQueryAjaxSettings*/ =
			{
				url: "",
				method: method,
				data:
				{
					c: controllerName,
					a: actionName,
					p: JSON.stringify(actionParameters)
				},
				success: successCallback,
				error: errorCallback
			}
			
			return $.ajax("", settings);
		}
	}
}
