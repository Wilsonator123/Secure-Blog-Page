import React from 'react';
import { Input } from '@/components/ui/input';
import Mail from '@/assets/mail.svg';

const EmailField = ({ label, register, errors, name, }) => {
  return (
    <div className="relative flex flex-col w-full justify-center items-center">
      <label className='text-text absolute -top-2 left-1' htmlFor={name}>{label}</label>
      <div className="input-container">
        <Input
          id={name}
          type="email"
          className="my-4 h-14 bg-black border-secondary text-text pl-12 focus:border-accent"
          {...register(name, { 
            required: `${label} is required`,
            pattern: {value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,message: "Invalid email address",
          }
          })}/>
        <div className="input-icon">
          <Mail width={30} height={30} fill={'#fff'} />
        </div>
      </div>
      {errors[name] && <div className="text-red-500 mt-2">{errors[name].message}</div>}
    </div>
  );
};

export default EmailField;