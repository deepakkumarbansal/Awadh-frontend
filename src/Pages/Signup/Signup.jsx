import React, { useState } from 'react'
import {Input, Logo, Password, SubmitButton} from '../../Components/index'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../../Services/Operations/auth';


const Signup = () => {
    const [error, setError] = useState('');
    const { handleSubmit, register, setValue, control, formState:{errors} } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSubmitPending, setIsSubmitPending] = useState(false);

    const handleSignup = async (data) => {
        setError("");
        setIsSubmitPending(true);
        try {
            if (data.password != data.confirmPassword) {
                setError('Password and Confirm Password must be same.');
                setIsSubmitPending(false);
                return;
            }
            //to be done the processing
            
            dispatch(login(data.email,data.password));
            navigate('/')

        } catch (error) {
            setError(error.message);
        }
        setIsSubmitPending(false);
    }
  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
            <div className='border-[1px] w-full sm:w-2/3 mx-3 lg:w-2/3 w-max-[1266px] min-h-[80%] rounded-xl flex flex-col items-center justify-center pb-4 shadow-xl bg-white'>
                <Logo className='mt-5' />
                <h2 className='text-2xl my-4'>Create a new account</h2>
                <p className='mb-3'>Already have any account? <Link to={'/login'} className='text-blue-500'>Login</Link></p>
                <p id='error-message' className='text-red-600'>{error}</p>
                <form onSubmit={handleSubmit(handleSignup)} className='w-full px-3 sm:w-2/3 lg:w-2/4 h-full'>
                    <Input type='text' name='name' register={register} placeholder='Name' errors={errors}/>
                    <Input type='email' name='email' register={register} placeholder='Email' errors={errors}/>
                    <Input type='tel' name='phone' register={register} placeholder='Phone' errors={errors}/>
                    <Password register={register} placeholder='Password' errors={errors}/>
                    <Password register={register} name='confirmPassword' placeholder='Confirm password' errors={errors}/>
                    <SubmitButton value="Signup" isSubmitPending={isSubmitPending}/>
                </form>
            </div>
        </div>
  )
}

export default Signup
