/// <reference path="../../collection/Map.ts" />

module JPV.Validation.Factory
{
	export class ValidationFactory
	{
		private synchroneValidatorFactories: Collection.Map<SynchroneValidatorFactory>;
		private synchroneFilterFactories: Collection.Map<SynchroneFilterFactory>;
		
		constructor(
			synchroneFilterFactories: Collection.Map<SynchroneFilterFactory> = new Collection.Map<SynchroneFilterFactory>(),
			synchroneValidatorFactories: Collection.Map<SynchroneValidatorFactory> = new Collection.Map<SynchroneValidatorFactory>()
		)
		{
			this.synchroneFilterFactories = new Collection.Map<SynchroneFilterFactory>({
				"JPVValidation\\Filter\\StringTrim": new Filter.StringTrimFactory()
			});
			
			this.synchroneValidatorFactories = new Collection.Map<SynchroneValidatorFactory>({
				"JPVValidation\\Validator\\StringLength": new Validator.StringLengthFactory(),
				"JPVValidation\\Validator\\NumberInteger": new Validator.NumberIntegerFactory(),
				"JPVValidation\\Validator\\NumberRange": new Validator.NumberRangeFactory()
			});
			
			this.synchroneFilterFactories.merge(synchroneFilterFactories);
			this.synchroneValidatorFactories.merge(synchroneValidatorFactories);
		}
		
		produceValidationElements(elementsJson: ValidationElementJson[])
		{
			let elements: ValidationElement[] = [];
			for (let elementJson of elementsJson)
			{
				elements.push(this.produceValidationElement(elementJson));	
			}
			return elements;
		}
		
		produceValidationElement<T>(elementJson: ValidationElementJson): ValidationElement
		{
			if (elementJson.type == ValidationElementType.FILTER)
				return this.produceSynchroneFilter(<SynchroneFilterJson> elementJson);	
			
			if (elementJson.type == ValidationElementType.VALIDATOR)
				return this.produceSynchroneValidator(<SynchroneValidatorJson> elementJson);	
			
			throw new Error("Unknown validation element type.");
		}
		
		produceSynchroneFilters<T>(filtersJson: SynchroneFilterJson[])
		{
			let filters: SynchroneFilter<T>[] = [];
			for (let filterJson of filtersJson)
			{
				filters.push(this.produceSynchroneFilter<T>(filterJson));	
			}
			return filters;
		}
		
		produceSynchroneFilter<T>(filterJson: SynchroneFilterJson)
		{
			let factory = this.synchroneFilterFactories.get(filterJson.class);
			
			if (factory == undefined)
				throw new Error("No factory for filter of class '" + filterJson.class + "' found.");
			
			let filter = factory.produce(filterJson);
			
			return <SynchroneFilter<T>> filter;
		}
		
		produceSynchroneValidators<T>(validatorsJson: SynchroneValidatorJson[])
		{
			let validators: SynchroneValidator<T>[] = [];
			for (let validatorJson of validatorsJson)
			{
				validators.push(this.produceSynchroneValidator<T>(validatorJson));	
			}
			return validators;
		}
		
		produceSynchroneValidator<T>(validatorJson: SynchroneValidatorJson)
		{
			let factory = this.synchroneValidatorFactories.get(validatorJson.class);
			
			if (factory == undefined)
				throw new Error("No factory for validator of class '" + validatorJson.class + "' found.");
			
			let validator = factory.produce(validatorJson);
			
			return <SynchroneValidator<T>> validator;
		}
	}	
}
