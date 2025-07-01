import { Fragment } from "react"
import type { InputHTMLAttributes } from "react";

import { useForm, type FieldValues, type Path } from "react-hook-form"
import type { UseFormProps, SubmitHandler, UseFormReturn } from "react-hook-form"

import ButtonContainer from "./Buttons"

type FormMethod = "GET" | "POST" | "PUT" | "DELETE";


interface EntityFormProps<TFormValues extends FieldValues> {
  defaultValues: UseFormProps<TFormValues>["defaultValues"];
  formMethod: FormMethod;
  onSubmit: SubmitHandler<TFormValues>;
  buttons?: React.ReactNode[];
  children: (form: UseFormReturn<TFormValues>) => React.ReactNode;
}

const EntityForm = <TFormValues extends FieldValues>({ defaultValues, formMethod, onSubmit, children, buttons }: EntityFormProps<TFormValues>) => {
  const isEditing = formMethod === "POST" || formMethod === "PUT";
  const form = useForm<TFormValues>({defaultValues});

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="form-attributes">
      {children(form)}
      <ButtonContainer>
          {isEditing ? <button type="submit" className="btn btn-primary">Submit</button> : <></>}
          {/* Render all custom buttons */}
          {buttons && buttons.map((button, index) => (
            <Fragment key={index}>
              {button}
            </Fragment>
          ))}
        </ButtonContainer>
    </form>
  )
}

interface FormInputProps<TFormValues extends FieldValues> extends Omit<InputHTMLAttributes<HTMLInputElement>, 'name' | 'form'> {
  fieldName: Path<TFormValues>;
  label: string;
  form: UseFormReturn<TFormValues>;
}

const FormInput = <TFormValues extends FieldValues>({ label, fieldName, form, required, ...props }: FormInputProps<TFormValues>) => {
  const { register } = form;
  return (
    <div className="form-attribute">
      <label className="label">{label}</label>
      <input {...register(fieldName, {required : required ?  `{label} is required` : false} )}{...props} className="input" />
    </div>
)}



export { EntityForm, FormInput };
