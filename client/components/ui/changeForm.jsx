import React from 'react';
import { useForm } from 'react-hook-form';

const ChangeForm = ({ title, subtitle, onSubmit, children, isChecked, setIsChecked, error }) => {
  const { handleSubmit, register, formState: { errors } } = useForm();

  return (
    <>
      <h2 className="text-text text-2xl font-bold text-center mb-2">{title}</h2>
      <div className="text-text text-center mb-8">{subtitle}</div>
      <form onSubmit={handleSubmit(onSubmit)}>

        {React.Children.map(children, child => {
          return React.cloneElement(child, { register, errors });
        })}
        
        <div className="flex items-center justify-center mt-4">
          <input type="checkbox" id="confirmChange" checked={isChecked} onChange={e => setIsChecked(e.target.checked)} className="w-6 h-6" />
          <label htmlFor="confirmChange" className="ml-2 text-text">I would like to make these changes.</label>
        </div>
        {error && <div className="text-red-500 text-center mt-2">{error}</div>}
      </form>
    </>
  );
};

export default ChangeForm;