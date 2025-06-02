const LabelAndInput = ({label, id,elementInput = "input", type = "text", placeholder, form, rows,disabled=false}) => {
    const props = { id,
                    value:form.values[id],
                    onChange:form.handleChange,
                    placeholder : placeholder||label,
                    className:`p-3 pl-4 rounded-lg border-2 w-full bg-white 
                                ${form.errors[id] ? "border-red-500 text-red-500" : "border-gray-300 text-black"}`,
                    disabled:disabled
                            }
    return (
        <div className="w-full font-semibold">
            <label htmlFor={id} className="text-gray-600 block p-1">{label}</label>
            
            {elementInput === "textarea" ? (
                <textarea {...props} rows={rows} />
            ) : (
                <input {...props} type={type} />
            )}
            
            {form.errors[id] && <span className="text-sm text-red-500 font-normal">{form.errors[id]}</span>}
        </div>
    );
};

export default LabelAndInput;