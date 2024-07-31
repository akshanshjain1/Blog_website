import React,{useId} from "react";
function Select({
    options,  // kis par select
    label,
    className,
    ...props},ref){
        const id=useId()
        return (
            <div className="w-full">
                {label /*label hai to display*/&& <label htmlFor={id} className=""></label>}
                <select {...props} id={id} ref={ref} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-200 duration-200 border-gray-200 w-full ${className}`}>
                    {/*optins is an arry  agar options hai */}
                    {options?.map((option)=>(
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                    </select>  
            </div>
        )
    }
    //forward ref
export default React.forwardRef(Select)