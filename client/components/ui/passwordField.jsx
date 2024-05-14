import React from 'react';
import { Input } from '@/components/ui/input';
import PasswordPin from '@/assets/passwordpin.svg';
import ShowPassword from '@/assets/showPassword.svg';
import HidePassword from '@/assets/hidePassword.svg';

const PasswordField = ({ label, showPassword, setShowPassword, register, errors, name, validate }) => {
  return (
    <div className="relative flex flex-col w-full justify-center items-center">
      <label className='text-text absolute -top-2 left-1' htmlFor={name}>{label}</label>
      <Input
        id={name}
        type={showPassword}
        className="my-4 h-14 bg-black border-secondary text-text pl-12 focus:border-accent "
        {...register(name, { required: `${label} is required`,validate: validate})}/>
      <div className="text-text absolute left-2 z-10">
        <PasswordPin fill={'#fff'} />
      </div>
      <div onClick={() => setShowPassword(prev => prev === 'text' ? 'password' : 'text')} className="text-text absolute right-2 z-10">
        {showPassword === 'password' ? <HidePassword width={30} height={30} fill={'#fff'} /> : <ShowPassword width={30} height={30} fill={'#fff'} />}
      </div>
      {errors[name] && <div className="text-red-500 mt-2">{errors[name].message}</div>}
    </div>
  );
};

export default PasswordField;