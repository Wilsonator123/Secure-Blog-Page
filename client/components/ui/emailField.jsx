import React from 'react';
import { Input } from '@/components/ui/input';
import Mail from '@/assets/mail.svg';

const EmailField = ({ label, register, errors, name }) => {
  return (
    <div className="relative flex flex-col w-full justify-center items-center mt-6">
      <label className='text-text absolute -top-2 left-1' htmlFor={name}>{label}</label>
      <Input
        id={name}
        type="email"
        className="my-4 h-14 bg-black border-secondary text-text pl-12 focus:border-accent"
        {...register(name, { 
          required: true,
          pattern: {
            value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
            message: "Invalid email address"
          }
        })}
      />
      <div className="text-text absolute left-2 z-10">
        <Mail width={30} height={30} fill={'#fff'} />
      </div>
      {errors[name] && <div className="text-red-500 mt-2">{errors[name].message}</div>}
    </div>
  );
};

export default EmailField;