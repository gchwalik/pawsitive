import Header from '../components/Header';
import Container from '../components/Container';
import { EntityForm, FormInput } from '../components/EntityForm';
import type { PlaceInput } from "../api/placesApi";
import { getEmptyPlaceInput, createPlace } from '../api/placesApi';

import { Link } from 'react-router';
import { ROUTES } from '../routes';

function CreatePlace() {
  const emptyPlace = getEmptyPlaceInput();

  const formButtons  = [
    <Link to={ROUTES.FRONTEND.ROOT} className="btn btn-primary">Cancel</Link>
  ]
  return (
    <>
      <Header />
      <div className="flex justify-center">
        <Container title="Create Place">
          <EntityForm<PlaceInput>
            defaultValues={emptyPlace}
            formMethod="POST"
            onSubmit={createPlace}
            buttons={formButtons}
          >
            <FormInput fieldName="name" label="Name:" required/>
          </EntityForm>
        </Container>
      </div>
    </>
  );
}

export default CreatePlace;
