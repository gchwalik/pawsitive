import ButtonContainer from '../components/Buttons';
import Container from '../components/Container';
import Header from '../components/Header';
import { EntityForm, FormInput } from '../components/EntityForm';

import { getEmptyPlaceInput, createPlace } from '../api/placesApi';
import type { PlaceInput } from "../api/placesApi";

import { Link } from 'react-router';
import { ROUTES } from '../routes';

function CreatePlace() {
  return (
    <>
      <Header />
      <div className="flex justify-center">
        <Container title="Create Place">
          <EntityForm<PlaceInput>
            defaultValues={getEmptyPlaceInput()}
            onSubmit={createPlace}
          >
            {(form)=> (
              <>
                <FormInput<PlaceInput> label="Name" fieldName="name" form={form} required />

                <ButtonContainer>
                  <button type="submit" className="btn btn-primary">Create</button>
                  <Link to={ROUTES.FRONTEND.ROOT} className="btn btn-primary">Cancel</Link>
                </ButtonContainer>
              </>
            )}
          </EntityForm>
        </Container>
      </div>
    </>
  );
}

export default CreatePlace;
