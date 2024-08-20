import React, { useEffect } from 'react'
import {Input, Password, SubmitButton} from '../index'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

const Profile = () => {
    const currentUser = useSelector((state)=>state.auth.user);
    const {register, formState:{errors}, getValues} = useForm({
        defaultValues:{
            name:'deepak' //to be remove
        }
    });
    return (
        <>
            <div className='mb-4'>
                <h2>Profile</h2>
            </div>
            <div className='md:flex gap-4 border-2 md:flex-col md:items-center lg:flex-row lg:justify-between lg:items-center'>
                <div className='avatar-container lg:w-[50%] mb-10 lg:mb-0'>
                    <img src={currentUser?.avatarUrl || '/images/author.jpg'} alt="Author Image" className='max-w-[400px]'/>
                </div>
                <div className='user-details w-full lg:w-[50%]'>
                    <Input type='text' name='name' register={register} placeholder='Name' errors={errors} value={getValues('name')}/>
                    <Input type='email' name='email' register={register} placeholder='Email' errors={errors} readOnly/>
                    <Input type='tel' name='phone' register={register} placeholder='Phone' errors={errors} />
                    <Password register={register} placeholder='Change Password' errors={errors} />
                    {/* <SubmitButton value="Signup" isSubmitPending={isSubmitPending} /> */}
                </div>
            </div>
        </>
    )
}

export default Profile
