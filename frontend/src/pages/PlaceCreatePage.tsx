import Header from '../components/Header';

import { getEmptyPlaceInput, createPlace } from '../api/placesApi';
import { CreateForm, FormInput } from '../components/form/EntityForm';
import type { PlaceInput } from '../api/placesApi';

function CreatePlace() {
  return (
    <>
      <Header />
      <CreateForm containerTitle='Create Place'
        defaultValues={getEmptyPlaceInput()}
        onSubmit={createPlace}
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
