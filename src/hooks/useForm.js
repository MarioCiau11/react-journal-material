import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [ formValidators, setFormValidators ] = useState( {} );

    useEffect( () => {
        createValidators();
    }, [ formState ] );

    const isFormValid = useMemo( () => {
    
        for ( const key of Object.keys( formValidators ) ) {
            if ( formValidators[key] != null) return false;
            
        }

        return true;
    }, [ formValidators ] );

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators = ( ) => {
        const formCheckedValues = {};

        for ( const formField of Object.keys( formValidations ) ) {
            const [ fn, errorMesssage ] = formValidations[ formField ];

            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMesssage;
         
        }

        setFormValidators( formCheckedValues );
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidators,
        isFormValid
    }
}