import { useEffect, useState, type InputHTMLAttributes } from "react";
import { Link } from "react-router";

import { useForm, type FieldValues, type Path } from "react-hook-form"
import type { UseFormProps, SubmitHandler, UseFormReturn } from "react-hook-form"

import ButtonContainer from "../Buttons";
import Container from "../Container";

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
  containerTitle: string;
  defaultValues: UseFormProps<TFormValues>["defaultValues"];
  onSubmit: SubmitHandler<TFormValues>;
  children: (form: UseFormReturn<TFormValues>) => React.ReactNode;
}

function CreateForm<TFormValues extends FieldValues>( {containerTitle, defaultValues, onSubmit, children}: CreateFormProps<TFormValues> ) {
  const reactForm = useForm<TFormValues>({defaultValues});
    const [isEditMode, setIsEditMode] = useState(false);

  return (
    <>
      <div className="flex justify-center">
        <Container>
          <div className="flex items-center">
            <h2 className="text-xl font-medium p-3 text-center flex-1">Create Place</h2>
            <div className="flex items-center space-x-3 px-5 ml-auto">
              <span className={`text-sm ${!isEditMode ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                View
              </span>
              <button
                onClick={() => setIsEditMode(!isEditMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isEditMode ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isEditMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm ${isEditMode ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                Edit
              </span>
            </div>
          </div>

          <form onSubmit={reactForm.handleSubmit(onSubmit)} className="form-attributes">
            {children(reactForm)}
            <ButtonContainer>
              <button type="submit" className="btn btn-primary">Create</button>
              <Link to={ROUTES.FRONTEND.ROOT} className="btn btn-primary">Cancel</Link>
            </ButtonContainer>
          </form>
        </Container>
      </div>
    </>
  );
}


interface ViewFormProps<TEntityInput extends FieldValues, TEntity extends FieldValues> {
  containerTitle: string; 
  entityId: number | undefined;
  useEntity: (id: number | undefined) => UseEntityReturn<TEntity>;
  toEntityInput: (entity: TEntity) => TEntityInput;
  editLink: (id: number) => string;
  deleteLink: (id: number) => string;
  children: (form: UseFormReturn<TEntityInput>) => React.ReactNode;
}

function ViewForm<TEntityInput extends FieldValues, TEntity extends FieldValues>({containerTitle, entityId, useEntity, toEntityInput, editLink, deleteLink, children}: ViewFormProps<TEntityInput, TEntity>) {
  const { entity, loading, error } = useEntity(entityId);
  const reactForm = useForm<TEntityInput>();

  useEffect(() => {
    if (!loading && entity) {
      reactForm.reset(toEntityInput(entity));
    }
  }, [entity])

  return (
    <>
      <div className="flex justify-center">
        <Container title={containerTitle}>
          {loading ? <div className="flex justify-center items-center flex-1">Loading...</div>
            : !entity ? <EntityNotFound error={error} />
            : <form className="form-attributes">
                {children(reactForm)}
                <ButtonContainer>
                  <Link to={editLink} className="btn btn-primary">Edit</Link>
                  <Link to={deleteLink} className="btn btn-danger">Delete</Link>
                  <Link to={ROUTES.FRONTEND.ROOT} className="btn btn-primary">Back</Link>
                </ButtonContainer>
              </form>
          }
        </Container>
      </div>
    </>
  );
}

interface EditFormProps<TEntityInput extends FieldValues, TEntity extends FieldValues> {
  containerTitle: string; 
  entityId: number | undefined;
  useEntity: (id: number | undefined) => UseEntityReturn<TEntity>;
  toEntityInput: (entity: TEntity) => TEntityInput;
  editLink: string;
  deleteLink: string;
  children: (form: UseFormReturn<TEntityInput>) => React.ReactNode;
}

function EditForm<TEntityInput extends FieldValues, TEntity extends FieldValues>({containerTitle, entityId, useEntity, toEntityInput, editLink, deleteLink, children}: EditFormProps<TEntityInput, TEntity>) {
  const { entity, loading, error } = useEntity(entityId);
  const reactForm = useForm<TEntityInput>();

  useEffect(() => {
    if (!loading && entity) {
      reactForm.reset(toEntityInput(entity));
    }
  }, [entity])

  return (
    <>
      <div className="flex justify-center">
        <Container title={containerTitle}>
          {loading ? <div className="flex justify-center items-center flex-1">Loading...</div>
            : !entity ? <EntityNotFound error={error} />
            : <form className="form-attributes">
                {children(reactForm)}
                <ButtonContainer>
                  <button type="submit" className="btn btn-primary">Submit</button>
                  <Link to={deleteLink} className="btn btn-danger">Delete</Link>
                  <Link to={ROUTES.FRONTEND.ROOT} className="btn btn-primary">Back</Link>
                </ButtonContainer>
              </form>
          }
        </Container>
      </div>
    </>
  );
}

// function DeleteForm<TFormValues extends FieldValues>( {containerTitle, defaultValues, onSubmit, children}: FormProps<TFormValues> ) {
//   const reactForm = useForm<TFormValues>({defaultValues});

//   return (
//     <>
//       <div className="flex justify-center">
//         <Container title={containerTitle}>
//           <form onSubmit={reactForm.handleSubmit(onSubmit)} className="form-attributes">
//             {children(reactForm)}
//             <p className='font-medium px-10 pb-4 text-rose-800'>Are you sure you want to delete {`${place.name}`}?</p>
//             <ButtonContainer>
//               <button type="submit" className="btn btn-danger">Yes</button>
//               <Link to={ROUTES.FRONTEND.ROOT} className="btn btn-primary">Cancel</Link>
//             </ButtonContainer>
//           </form>
//         </Container>
//       </div>
//     </>
//   );
// }


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
