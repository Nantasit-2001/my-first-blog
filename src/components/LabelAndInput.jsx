const LabelAndInput = (({ textLabel, id, type, textPlaceholder,textInput,setTextInput,textInputError,setTextInputError}) => {
    return (
        <div className="w-full font-semibold">
            <label htmlFor={id} className="text-[#75716B] block p-1">{textLabel}</label>
            <input
                className={`p-3 pl-4 rounded-lg border-2 w-full bg-white  ${textInputError[id]===""?"text-black border-[#DAD6D1]":"text-[#EB5164] border-[#EB5164]"}`}
                id={id}
                type={type}
                placeholder={textPlaceholder}
                value={textInput[id]}
                onChange={(event) => {setTextInput((prev) => ({ ...prev, [id]:event.target.value}));
                                      setTextInputError((prev)=>({...prev,[id]:""}))}}
            />
            {textInputError[id]===""?undefined:<span className="text-sm text-[#EB5164] font-normal"> {textInputError[id]}</span>}
        </div>
    );
});

export default LabelAndInput