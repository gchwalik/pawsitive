import { useEffect, type InputHTMLAttributes } from "react";
import { Link } from "react-router";

import { useForm, type FieldValues, type Path } from "react-hook-form"
import type { UseFormProps, SubmitHandler, UseFormReturn } from "react-hook-form"

import ButtonContainer from "../Buttons";

import { ROUTES } from "../../routes";

import { type UseEntityReturn } from "../../hooks/useEntity";

interface EntityNotFoundProps {
  error: string | null;
}

function EntityNotFound({error}: EntityNotFoundProps) {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex justify-center items-center flex-1">
        <p>{error}</p>
      </div>
      <ButtonContainer>
        <Link to={ROUTES.FRONTEND.ROOT} className="btn btn-primary">Back</Link>
      </ButtonContainer>
    </div>
  );
}

interface CreateFormProps<TFormValues extends FieldValues> {
  defaultValues: UseFormProps<TFormValues>["defaultValues"];
  onSubmit: SubmitHandler<TFormValues>;
  children: (form: UseFormReturn<TFormValues>) => React.ReactNode;
}

function CreateForm<TFormValues extends FieldValues>( {defaultValues, onSubmit, children}: CreateFormProps<TFormValues> ) {
  const reactForm = useForm<TFormValues>({defaultValues});

  return (
    <>
      <form onSubmit={reactForm.handleSubmit(onSubmit)} className="form-attributes">
        {children(reactForm)}
        <ButtonContainer>
          <button type="submit" className="btn btn-primary">Create</button>
          <Link to={ROUTES.FRONTEND.ROOT} className="btn btn-primary">Cancel</Link>
        </ButtonContainer>
      </form>
    </>
  );
}

interface ViewFormProps<TEntityInput extends FieldValues, TEntity extends FieldValues> {
  entityId: number | undefined;
  useEntity: (id: number | undefined) => UseEntityReturn<TEntity>;
  toEntityInput: (entity: TEntity) => TEntityInput;
  editLink: string;
  deleteLink: string;
  children: (form: UseFormReturn<TEntityInput>) => React.ReactNode;
}

function ViewForm<TEntityInput extends FieldValues, TEntity extends FieldValues>({entityId, useEntity, toEntityInput, editLink, deleteLink, children}: ViewFormProps<TEntityInput, TEntity>) {
  const { entity, loading, error } = useEntity(entityId);
  const reactForm = useForm<TEntityInput>();

  useEffect(() => {
    if (!loading && entity) {
      reactForm.reset(toEntityInput(entity));
    }
  }, [entity])

  return (
    <>
      {loading ? <div className="flex justify-center items-center flex-1">Loading...</div>
        : !entity ? <EntityNotFound error={error} />
        : <form className="form-attributes">
            {children(reactForm)}
            <ButtonContainer>
              <Link to={editLink} className="btn btn-primary">Edit</Link>
              <Link to={deleteLink} className="btn btn-primary">Delete</Link>
              <Link to={ROUTES.FRONTEND.ROOT} className="btn btn-primary">Back</Link>
            </ButtonContainer>
          </form>
      }
    </>
  );
}


interface EditFormProps<TEntityInput extends FieldValues, TEntity extends FieldValues> {
  entityId: number | undefined;
  useEntity: (id: number | undefined) => UseEntityReturn<TEntity>;
  toEntityInput: (entity: TEntity) => TEntityInput;
  onSubmit: SubmitHandler<TEntityInput>;
  deleteLink: string;
  children: (form: UseFormReturn<TEntityInput>) => React.ReactNode;
}

function EditForm<TEntityInput extends FieldValues, TEntity extends FieldValues>({entityId, useEntity, toEntityInput, onSubmit, deleteLink, children}: EditFormProps<TEntityInput, TEntity>) {
  const { entity, loading, error } = useEntity(entityId);
  const reactForm = useForm<TEntityInput>();

  useEffect(() => {
    if (!loading && entity) {
      reactForm.reset(toEntityInput(entity));
    }
  }, [entity])

  return (
    <>
      {loading ? <div className="flex justify-center items-center flex-1">Loading...</div>
        : !entity ? <EntityNotFound error={error} />
        : <form onSubmit={reactForm.handleSubmit(onSubmit)}  className="form-attributes">
            {children(reactForm)}
            <ButtonContainer>
              <button type="submit" className="btn btn-primary">Update</button>
              <Link to={deleteLink} className="btn btn-danger">Delete</Link>
              <Link to={ROUTES.FRONTEND.ROOT} className="btn btn-primary">Home</Link>
            </ButtonContainer>
          </form>
      }
    </>
  );
}


interface FormInputProps<TFormValues extends FieldValues> extends Omit<InputHTMLAttributes<HTMLInputElement>, 'name' | 'form'> {
  fieldName: Path<TFormValues>;
  label: string;
  form: UseFormReturn<TFormValues>;
  disabled?: boolean;
}

const FormInput = <TFormValues extends FieldValues>({ label, fieldName, required, disabled, form, ...props }: FormInputProps<TFormValues>) => {
  const { register } = form;
  return (
    <div className="form-attribute">
      <label className="label">{label}</label>
      <input {...register(fieldName, {required : required ?  `{label} is required` : false, disabled } )}{...props} className={`input ${disabled && "border-none"}`} />
    </div>
)}



export { CreateForm, ViewForm, EditForm, FormInput };
