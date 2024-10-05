import React, { useEffect, useState } from 'react'
import {Input, Password, SubmitButton} from '../index'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import Modal from '../Modal/Modal'
import { changePassword } from '../../Services/Operations/auth'

const Profile = () => {
    const [isNameModalOpen, setIsNameModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    const currentUser = useSelector((state)=>state.auth);
    
    const {register, formState:{errors}, getValues} = useForm({
        defaultValues:{
            email:currentUser?.email,
            name:currentUser?.userName,
            role:currentUser?.role,
        }
    });


    // Password Modal
    const PasswordModal = () => {
        const [loading, setLoading] = useState(false);
      return (
        <Modal
          isVisible={isPasswordModalOpen}
          onClose={() => {
            setIsPasswordModalOpen(false);
          }}
        >
          <Password
            register={register}
            placeholder="Current Password"
            errors={errors}
            name='name'
            value={getValues("name")}
          />
          <Password
            register={register}
            placeholder="Password"
            errors={errors}
            name='password'
            value={getValues("password")}
          />

          <SubmitButton value="Update Password" isSubmitPending={loading} onClick={()=>changePassword(currentUser?.email, getValues("currentPassword"), getValues("newPassword"), setLoading)}/>

        </Modal>
      );
    };
    // Name modal
    const NameModal = () => {
        const [loading, setLoading] = useState(false);
      return (
        <Modal
          isVisible={isPasswordModalOpen}
          onClose={() => {
            setIsPasswordModalOpen(false);
          }}
        >
          <Input
            register={register}
            placeholder="Current Password"
            errors={errors}
            name='New Name'
            value={getValues("currentPassword")}
          />
          <Password
            register={register}
            placeholder="New Password"
            errors={errors}
            name='newPassword'
            value={getValues("newPassword")}
          />

          <SubmitButton value="Update Password" isSubmitPending={loading} onClick={()=>changePassword(currentUser?.email, getValues("currentPassword"), getValues("newPassword"), setLoading)}/>

        </Modal>
      );
    };
    
    return (
        <>
            <div className='mb-4'>
                <h2 className='text-5xl font-bold'>Profile</h2>
            </div>
            <div className='md:flex gap-4 border-2 md:flex-col md:items-center lg:flex-row lg:justify-between lg:items-center p-4'>
                <div className='avatar-container lg:w-[50%] mb-10 lg:mb-0'>
                    <img src={currentUser?.avatarUrl || '/images/author.jpg'} alt="Author Image" className='max-w-[400px]'/>
                </div>
                <div className='user-details w-full lg:w-[50%]'>
                    <Input type='text' name='name' register={register} placeholder='Name' errors={errors} readOnly value={getValues('name')}/>
                    <Input type='email' name='email' register={register} placeholder='Email' errors={errors} readOnly value={getValues('email')}/>
                    <Input type='text' name='role' register={register} placeholder='Role' errors={errors} readOnly value={getValues('role')}/>
                    <div className='flex justify-end gap-4 mt-4'>
                        <button className='bg-gray-300 px-4 py-2 text-lg font-bold rounded-md hover:bg-red-300 transition-all' onClick={()=>setIsNameModalOpen(true)}>Edit Name</button>
                        <button className='bg-gray-300 px-4 py-2 text-lg font-bold rounded-md hover:bg-red-300 transition-all' onClick={()=>setIsPasswordModalOpen(true)}>Change Password</button>
                    </div>
                    {/* <Password register={register} placeholder='Change Password' errors={errors} /> */}
                    {/* <SubmitButton value="Signup" isSubmitPending={isSubmitPending} /> */}
                </div>
            </div>
            <PasswordModal/>
        </>
    )
}

export default Profile
