import React from 'react';

export default function Input({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  icon: Icon,
  rightElement,
  error,
  helperText,
  disabled = false,
  className = '',
  required = false,
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 pointer-events-none text-slate-400 dark:text-slate-500">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full rounded-xl border transition-all text-sm outline-none 
            bg-white dark:bg-slate-900 
            text-slate-900 dark:text-slate-100 
            placeholder:text-slate-400 dark:placeholder:text-slate-500
            ${Icon ? 'pl-10' : 'pl-3.5'} 
            ${rightElement ? 'pr-10' : 'pr-3.5'} 
            py-2.5 
            ${
              error
                ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
                : 'border-slate-200 dark:border-slate-800 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
            }
            disabled:opacity-60 disabled:bg-slate-100 dark:disabled:bg-slate-850
            ${className}`}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-3 text-slate-400 dark:text-slate-500">
            {rightElement}
          </div>
        )}
      </div>
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
      {!error && helperText && (
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{helperText}</p>
      )}
    </div>
  );
}
