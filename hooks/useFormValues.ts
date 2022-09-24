import { useState } from "react";

export function useFormValues<T extends object>(initialValues: T) {
    const [formValues, setFormValues] = useState<T>(initialValues);

    function change<Field extends keyof T>(field: Field, newValue: T[Field]) {
        setFormValues(old => ({
            ...old,
            [field]: newValue
        }));
    }

    return {
        values: formValues,
        change,
    };
}
