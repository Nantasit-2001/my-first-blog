import { useState } from "react";
//                  VVV Obj input   VVV function CheckError
const useForm = (initialValues, validate) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { id, value } = e.target;
        setValues((prev) => ({ ...prev, [id]: value })); // get value when user input
        setErrors((prev) => ({ ...prev, [id]: "" })); // delete error when Rewrite
    };
    // VVV function check has Error (return false if Error)
    const validateForm = () => {
        const newErrors = validate(values);
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return { values, errors, handleChange, validateForm };
};

export default useForm;