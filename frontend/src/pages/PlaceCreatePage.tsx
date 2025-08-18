import Header from '../components/Header';

import { getEmptyPlaceInput, createPlace } from '../api/placesApi';
import { CreateForm, FormInput } from '../components/form/EntityForm';
import type { PlaceInput } from '../api/placesApi';

import { useNavigate } from 'react-router';

import { ROUTES } from '../routes';

import type { SubmitHandler } from 'react-hook-form';

function CreatePlace() {
  const navigate = useNavigate();
    
  const handleCreate: SubmitHandler<PlaceInput> = async (placeInput: PlaceInput) => {
    try {
      const response = createPlace(placeInput);
      console.log('Place created:', response);
      // After successful creation, navigate back
      navigate(ROUTES.FRONTEND.ROOT);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Header />
      <CreateForm containerTitle='Create Place'
        defaultValues={getEmptyPlaceInput()}
        onSubmit={handleCreate}
      >
        {(form) => (
          <>
            <FormInput<PlaceInput> label="Name:" fieldName="name" form={form}/>
          </>
        )}
      </CreateForm>
    </>
  );
}

export default CreatePlace;
