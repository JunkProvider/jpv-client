module JPV.Exception
{
	export class AbstractMethodCallError
	{
		get message() { return "Abstract method called."; }
	}
	
	AbstractMethodCallError.prototype = new Error();
}
