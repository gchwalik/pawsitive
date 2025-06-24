import { Link, useNavigate } from 'react-router';
import { useForm, type FieldValues, type SubmitHandler, type UseFormProps } from "react-hook-form";

import React, { useState, useRef, useEffect, type MouseEventHandler } from 'react';

import ButtonContainer from './Buttons';

type FormMethod = "GET" | "POST" | "PUT" | "DELETE";


interface EntityFormProps<TFormValues extends FieldValues> {
  defaultValues: UseFormProps<TFormValues>["defaultValues"];
  formMethod: FormMethod;
  onSubmit: SubmitHandler<TFormValues>;
  buttons?: React.ReactNode[];
  children?: React.ReactNode;
}

const EntityForm = <TFormValues extends FieldValues>({ defaultValues, formMethod, onSubmit, buttons, children}: EntityFormProps<TFormValues>) => {
  const isEditing = formMethod === "POST" || formMethod === "PUT";
  const {register, handleSubmit} = useForm<TFormValues>({defaultValues});

  return (
    <>
      <form method={formMethod} onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1">
        <div className="place-attributes">
          {children}
        </div>
        <ButtonContainer>
          {isEditing ? <button type="submit" className="btn btn-primary">Submit</button> : <></>}
          {/* Render all custom buttons */}
          {buttons && buttons.map((button, index) => (
            <React.Fragment key={index}>
              {button}
            </React.Fragment>
          ))}
        </ButtonContainer>
      </form>
    </>
  );
};

interface FieldWrapperProps {
  label: string;
  fieldId: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

const FieldWrapper = ({
  fieldId,
  label,
  required,
  error,
  children,
  className = ""
}: FieldWrapperProps) => (
  <div className={`form-field ${className}`}>
    <label htmlFor={fieldId} className="form-label">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    {children}
    {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
  </div>
);


interface EntityFormFieldProps<TFormValues extends FieldValues> {
  label: string;
  field: keyof TFormValues;
}


// =============================================================================
// BASE INTERFACES
// =============================================================================

interface BaseFieldProps<T extends FieldValues> {
  label: string;
  field: Path<T>;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  validation?: RegisterOptions<T>;
}


const EntityFormTextField;
const Field

const EntityFormField = ({ label, field, type = 'text', options = [] }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    {isEditable ? (
      type === 'select' ? (
        <select
          value={formData[field] || ''}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select {label}</option>
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          value={formData[field] || ''}
          onChange={(e) => handleInputChange(field, e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <input
          type={type}
          value={formData[field] || ''}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )
    ) : (
      <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-900">
        {formData[field] || 'Not specified'}
      </div>
    )}
  </div>
);

// const EntityFormField = ({ children }: { children: React.ReactNode }) => (
//   <div className="dropdown-element">
//     {children}
//   </div>
// );
// interface DropdownItemProps {
//   icon?: Icon;
//   onClick: MouseEventHandler;
//   children: React.ReactNode;
// }
// // Use when clicking does something or triggers an action, like a button
// const DropdownItem = ({ children, onClick, icon: ListIcon }: DropdownItemProps) => (
//   <button onClick={onClick} className="dropdown-element">
//     {ListIcon && <ListIcon className="w-4 h-4 mr-3" />}
//     {children}
//   </button>
// );


// interface DropdownLinkProps {
//   to: string;
//   icon?: Icon;
//   children?: React.ReactNode;
// }

// // Use when clicking takes you somewhere else, like navigating to another page
// const DropdownLink = ({ to, children, icon: Icon }: DropdownLinkProps) => (
//   <Link to={to} className="dropdown-element">
//     {Icon && <Icon className="w-4 h-4 mr-3" />}
//     {children}
//   </Link>
// );

export { EntityForm, EntityFormField };
