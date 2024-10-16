import React, { useState } from 'react'
import Input from '../Input/Input';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Password = ({placeholder, register, errors, name='password', onChange=()=>{}, className='', value=''}) => {
    const [viewPassword, setViewPassword] = useState(false);
    const toggleViewPassword = () => {
        setViewPassword(!viewPassword)
    };

    return (
        <div className='relative'>
            <Input type={viewPassword ? 'text' : 'password'} name={name} placeholder={placeholder} register={register} errors={errors} onChange={onChange} className={className} value={value}/>
            <div onClick={toggleViewPassword}>
                {viewPassword ? <FaEyeSlash className={`absolute top-[50%] right-4 text-2xl translate-y-[-50%]`} /> : <FaEye className={`absolute top-[50%] right-4 text-2xl translate-y-[-50%]`} />}
            </div>
        </div>
    )
}

export default Password
