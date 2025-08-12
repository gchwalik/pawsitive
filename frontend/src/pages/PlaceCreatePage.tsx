import Header from '../components/Header';
import { useNavigate } from 'react-router';

import { getEmptyPlaceInput, createPlace } from '../api/placesApi';
import { CreateForm, FormInput } from '../components/form/EntityForm';
import type { PlaceInput } from '../api/placesApi';
import { ROUTES } from '../routes';


function CreatePlace() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <CreateForm containerTitle='Create Place'
        defaultValues={getEmptyPlaceInput()}
        onSubmit={createPlace}
        onSuccess={() => navigate(ROUTES.FRONTEND.ROOT)}
      >
        {(form) => (
          <>
            <FormInput<PlaceInput> label="Name:" name="name" form={form} type="text" required/>
            <FormInput<PlaceInput> label="Type:" name="type_id" form={form} type="number" required/>
          </>
        )}
      </CreateForm>
    </>
  );
}

export default CreatePlace;
