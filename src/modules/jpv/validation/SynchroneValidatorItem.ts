/// <reference path="ValidityItemBase.ts" />
/// <reference path="SynchroneValidator.ts" />

module JPV.Validation
{
	export class SynchroneValidatorItem<T>
		extends ValidityItemBase<T>
		implements ValidityItem<T>
	{
		private validator: SynchroneValidator<T>;
		
		constructor(validator: SynchroneValidator<T>)
		{
			super(validator.text, false);
			this.validator = validator;	
		}
		
		update(validationState: ValidationState<T>, callback: (state: ValidationState<T>) => void)
		{
			if (validationState.interrupted)
			{
				this.setState(ValidityItemState.NOT_CHECKED);
				callback(validationState);
				return;
			}
			
			let valid = this.validator.isValid(validationState.value);
			let state: ValidityItemState;
			
			if (valid)
			{
				state = ValidityItemState.VALID;	
			}
			else
			{
				state = ValidityItemState.IVALID;
				validationState.valid = false;
				if (this.validator.stopIfInvalid)
					validationState.interrupted = true;
			}
			
			this.setState(state);
			
			callback(validationState);
		}
		
		cancelUpdate()
		{
			// Do nothing because this validator is not asynchrone	
		}
		
		reset()
		{
			this.setState(ValidityItemState.NOT_CHECKED);	
		}
	}
}
