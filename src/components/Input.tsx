import React from 'react';
import classnames from 'classnames';

interface InputProps {
  setState: React.Dispatch<React.SetStateAction<string>> | React.Dispatch<React.SetStateAction<number>>;
  handleValueChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value: string | number;
  placeholder?: string;
  id: string;
  labelText?: string;
  additionalClasses?: string;
  required?: boolean;
  size?: 'sm' | 'md' | 'lg';
  type?: 'text' | 'date' | 'password' | 'email' | 'number';
  onFocus?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
  setState,
  handleValueChange,
  name,
  value,
  placeholder,
  id,
  labelText,
  additionalClasses,
  required,
  size,
  type,
  onFocus,
  onBlur,
}: InputProps): JSX.Element => {
  function internalHandleValueChange(event: React.ChangeEvent<HTMLInputElement>) {
    setState(event.currentTarget.value);
  }

  return (
    <>
      {labelText && (
        <label className="label" htmlFor={id}>
          {labelText.toUpperCase()}
        </label>
      )}
      <input
        onChange={handleValueChange !== undefined ? handleValueChange : internalHandleValueChange}
        className={classnames('input', `input--${size}`, additionalClasses)}
        type={type}
        name={name}
        value={value}
        id={id}
        placeholder={placeholder}
        required={required}
        onFocus={onFocus}
        onBlur={onBlur}
      ></input>
    </>
  );
};

export default Input;
