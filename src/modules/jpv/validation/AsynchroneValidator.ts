module JPV.Validation
{
	export interface AsynchroneValidator<T> extends ValidationElement
	{
		text: string;
		validate(value: T, callback: (valid: boolean) => void): void;
		cancelValidation(): void;
		isAsynchroneValidator(): boolean;
	}
}
