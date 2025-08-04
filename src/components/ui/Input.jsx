import React from 'react';

const Input = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  helperText,
  error,
  className = '',
  ...props
}) => {
  const inputClasses = `
    block w-full px-3 py-2 bg-dark-navy3 border border-dark-navy2 rounded-lg 
    text-light-white placeholder-light-gray/50 
    focus:outline-none focus:ring-2 focus:ring-neon-purple focus:border-transparent
    disabled:opacity-50 disabled:cursor-not-allowed
    ${error ? 'border-red-500 focus:ring-red-500' : ''}
    ${className}
  `;

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-light-white">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={inputClasses}
        {...props}
      />
      
      {(helperText || error) && (
        <p className={`text-xs ${error ? 'text-red-400' : 'text-light-gray'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};

export default Input;
