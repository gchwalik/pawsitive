import { Fragment, createContext, useContext } from "react"
import { useForm, type FieldValues } from "react-hook-form"
import type { UseFormProps, UseFormRegister, SubmitHandler } from "react-hook-form"
import type { InputHTMLAttributes } from "react"
import ButtonContainer from "./Buttons"

type FormMethod = "GET" | "POST" | "PUT" | "DELETE";


// Define the context type
interface FormContextType {
  register: UseFormRegister<FieldValues>;
  // Add other form methods you need here
}

const FormContext = createContext<FormContextType | null>(null);

const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a Form')
  }
  return context
}

interface EntityFormProps<TFormValues extends FieldValues> {
  defaultValues: UseFormProps<TFormValues>["defaultValues"];
  formMethod: FormMethod;
  onSubmit: SubmitHandler<TFormValues>;
  buttons?: React.ReactNode[];
  children?: (register: UseFormRegister<TFormValues>) => React.ReactNode;
}

const EntityForm = <TFormValues extends FieldValues>({ defaultValues, formMethod, onSubmit, children, buttons }: EntityFormProps<TFormValues>) => {
  const isEditing = formMethod === "POST" || formMethod === "PUT";
  const {register, handleSubmit} = useForm<TFormValues>({defaultValues});

  return (
    <FormContext value={{register: register as UseFormRegister<FieldValues> }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {children && children(register)}
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
    </FormContext>
  )
}

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  fieldName: string;
  label: string;
}

const FormInput = ({ label, fieldName, ...props }: FormInputProps) => {
  const { register } = useFormContext();
  return <input {...register(fieldName)} {...props} />
}


export { EntityForm, FormInput };
