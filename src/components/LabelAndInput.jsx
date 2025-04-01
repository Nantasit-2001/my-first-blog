const LabelAndInput = ({ label, id, type = "text", placeholder, form }) => {
    return (
        <div className="w-full font-semibold">
            <label htmlFor={id} className="text-gray-600 block p-1">{label}</label>
            <input
                id={id}
                type={type}
                value={form.values[id]} // ดึงค่าจาก useForm
                onChange={form.handleChange} // ใช้ handleChange จาก useForm
                placeholder={placeholder||label}
                className={`p-3 pl-4 rounded-lg border-2 w-full bg-white 
                           ${form.errors[id] ? "border-red-500 text-red-500" : "border-gray-300 text-black"}`}
            />
            {form.errors[id] && <span className="text-sm text-red-500 font-normal">{form.errors[id]}</span>}
        </div>
    );
};

export default LabelAndInput;