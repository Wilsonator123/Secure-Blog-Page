import React from 'react';
import { Input } from '@/components/ui/input';
import ProfileIcon from '@/assets/profile.svg';

export default function NameField({ label, value, onChange, placeholder, name, register, errors }) {
  return (
    <div className="relative flex flex-col w-full justify-center items-center mb-2">
      <label className='text-text absolute -top-2 left-1' htmlFor="name">{label}</label>
      <Input id="name" type="text" className="my-4 h-14 bg-black border-secondary text-text pl-12 focus:border-accent"
        required value={value} placeholder={placeholder} autoComplete="name"
        {...register(name, {
            required: "Name is required",
            minLength: {value: 3,message: "Name must be at least 3 characters"},
            validate: {noWhitespace: value => !/\s/.test(value) || "Name cannot contain whitespace"}})}
            onChange={onChange}/>
      <div className="text-text absolute left-2 z-10">
        <ProfileIcon width={30} height={30} fill={'#fff'} />
      </div>
      {errors[name] && <span className="text-red-500 text-center mt-2">{errors[name].message}</span>}
    </div>
  );
}