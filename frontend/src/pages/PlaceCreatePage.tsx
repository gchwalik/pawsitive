import { useNavigate } from 'react-router';
import type { SubmitHandler } from 'react-hook-form';

import Navbar from '../components/Navbar';
import { CreateForm, FormInput } from '../components/form/EntityForm';

import { getEmptyPlaceInput, createPlace } from '../api/placesApi';
import type { PlaceInput } from '../api/placesApi';

import { ROUTES } from '../routes';

import Container from '../components/Container';

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
      <Navbar />
      <div className="flex justify-center">
        <Container title="Create Place" className="p-5">
          <CreateForm
            defaultValues={getEmptyPlaceInput()}
            onSubmit={handleCreate}
          >
            {(form) => (
              <>
                <FormInput<PlaceInput> label="Name:" fieldName="name" form={form}/>
              </>
            )}
          </CreateForm>
        </Container>
      </div>
    </>
  );
}

export default CreatePlace;
