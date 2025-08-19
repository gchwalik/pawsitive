import { useNavigate } from 'react-router';
import type { SubmitHandler } from 'react-hook-form';

import Header from '../components/Header';
import { CreateForm, FormInput } from '../components/form/EntityForm';

import { getEmptyPlaceInput, createPlace } from '../api/placesApi';
import type { PlaceInput } from '../api/placesApi';

import { ROUTES } from '../routes';

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
