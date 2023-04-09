import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface ITextFieldProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label: string;
  name?: string;
}

const TextField = ({ label, name, className, ...props }: ITextFieldProps) => {
  return (
    <div className={className}>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input type="text" className="form-control" name={name} {...props} />
    </div>
  );
};

export default TextField;
