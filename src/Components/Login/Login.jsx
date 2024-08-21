import React, { useState } from 'react'
import {Input, Logo, Password, SubmitButton} from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

const Signup = () => {
    const [error, setError] = useState('');
    const { handleSubmit, register, setValue, control, formState:{errors} } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSubmitPending, setIsSubmitPending] = useState(false);
    const [userType, setUserType] = useState('admin') //Example of the userType

    const handleSignup = async (data) => {
        setError("");
        setIsSubmitPending(true);
        try {
            //to be done
            if(userType === 'admin' || 'reporter'){
                //to be done
                // dispatch()
                navigate('/admin');
            } else{
                navigate('/');
            }

        } catch (error) {
            setError(error.message);
        }
        setIsSubmitPending(false);
    }
  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
            <div className='border-[1px] w-full sm:w-2/3 mx-3 lg:w-2/3 w-max-[1266px] min-h-[80%] rounded-xl flex flex-col items-center justify-center pb-4 shadow-xl bg-white'>
                <Logo className='mt-5' />
                <h2 className='text-2xl my-4'>Login to account</h2>
                <p className='mb-3'>Don't have any account? <Link to={'/signup'} className='text-blue-500'>Signup</Link></p>
                <p id='error-message' className='text-red-600'>{error}</p>
                <form onSubmit={handleSubmit(handleSignup)} className='w-full px-3 sm:w-2/3 lg:w-2/4 h-full'>
                    <Input type='email' name='email' register={register} placeholder='Email' errors={errors}/>
                    <Password register={register} placeholder='Password' errors={errors}/>
                    <SubmitButton value="Login" isSubmitPending={isSubmitPending}/>
                </form>
            </div>
        </div>
  )
}

export default Signup
