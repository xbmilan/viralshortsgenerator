import React from 'react';

const Select = ({
  label,
  name,
  value,
  onChange,
  options = [],
  required = false,
  disabled = false,
  helperText,
  error,
  className = '',
  ...props
}) => {
  const selectClasses = `
    block w-full px-3 py-2 bg-dark-navy3 border border-dark-navy2 rounded-lg 
    text-light-white 
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
      
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={selectClasses}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-dark-navy3 text-light-white">
            {option.label}
          </option>
        ))}
      </select>
      
      {(helperText || error) && (
        <p className={`text-xs ${error ? 'text-red-400' : 'text-light-gray'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};

export default Select;
