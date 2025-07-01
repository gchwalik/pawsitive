import type { InputHTMLAttributes } from "react";

import { useForm, type FieldValues, type Path } from "react-hook-form"
import type { UseFormProps, SubmitHandler, UseFormReturn } from "react-hook-form"


interface EntityFormProps<TFormValues extends FieldValues> {
  defaultValues: UseFormProps<TFormValues>["defaultValues"];
  onSubmit: SubmitHandler<TFormValues>;
  children: (form: UseFormReturn<TFormValues>) => React.ReactNode;
}

const EntityForm = <TFormValues extends FieldValues>({ defaultValues, onSubmit, children }: EntityFormProps<TFormValues>) => {
  const reactForm = useForm<TFormValues>({defaultValues});

  return (
    <form onSubmit={reactForm.handleSubmit(onSubmit)} className="form-attributes">
      {children(reactForm)}
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
