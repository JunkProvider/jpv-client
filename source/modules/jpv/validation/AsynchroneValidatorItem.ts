/// <reference path="ValidityItemBase.ts" />
/// <reference path="AsynchroneValidator.ts" />

module JPV.Validation
{
	export class AsynchroneValidatorItem<T>
		extends ValidityItemBase<T>
		implements ValidityItem<T>
	{
		private interruptIfInvalid: boolean = false;
		private validator: AsynchroneValidator<T>;
		
		constructor(validator: AsynchroneValidator<T>)
		{
			super(validator.text, false);
			this.validator = validator;	
		}
		
		update(validationState: ValidationState<T>, callback: (state: ValidationState<T>) => void)
		{
			this.cancelUpdate();
			
			if (validationState.interrupted)
			{
				this.setState(ValidityItemState.NOT_CHECKED);
				callback(validationState);
				return;
			}
			
			this.setState(ValidityItemState.IN_PROGRESS);
			
			this.validator.validate(validationState.value, (valid: boolean) => {
				let state: ValidityItemState;
			
				if (valid)
				{
					state = ValidityItemState.VALID;	
				}
				else
				{
					state = ValidityItemState.IVALID;
					validationState.valid = false;
					if (this.interruptIfInvalid)
						validationState.interrupted = true;
				}
				
				this.setState(state);
				
				callback(validationState);
			});
		}
		
		cancelUpdate()
		{
			this.validator.cancelValidation();
		}
		
		reset()
		{
			// Cancel update, just for safety
			this.cancelUpdate();
			this.setState(ValidityItemState.NOT_CHECKED);	
		}
	}
}
