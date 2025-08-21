import { useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { useForm } from 'react-hook-form';
import type { UseFormReturn } from 'react-hook-form';

import ButtonContainer from '../components/Buttons';
import Container from '../components/Container';
import Navbar from '../components/Navbar';
import PlaceNotFound from '../components/PlaceNotFound';

import { toPlaceInput } from '../api/placesApi';
import type { PlaceInput } from '../api/placesApi';

import { usePlace } from '../hooks/usePlace';

import { ROUTES } from '../routes';


interface ViewPlaceFormProps {
  placeId: number,
  reactForm: UseFormReturn<PlaceInput>,
}

function ViewPlaceForm({ 
  placeId,
  reactForm
}: ViewPlaceFormProps) {
  const { register } = reactForm;

  return (
    <form className="form-attributes">
      <div className="form-attribute">
        <label className="label">Name:</label>
        <input {...register("name", { disabled: true } )} className="border-none" />
      </div>
      <ButtonContainer>
        <Link to={ROUTES.FRONTEND.PLACES_EDIT(placeId)} className="btn btn-primary">Edit</Link>
        <Link to={ROUTES.FRONTEND.PLACES_DELETE(placeId)} className="btn btn-primary">Delete</Link>
        <Link to={ROUTES.FRONTEND.ROOT} className="btn btn-primary">Back</Link>
      </ButtonContainer>
    </form>
  );
}


function ViewPlace() {
  const { id: paramId } = useParams<{ id: string }>();
  const placeId = Number(paramId)
  const { place, loading, error } = usePlace(placeId);
  const reactForm = useForm<PlaceInput>();

  useEffect(() => {
    if (!loading && place) {
      reactForm.reset(toPlaceInput(place));
    }
  }, [place, loading, reactForm])

  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <Container title="View Place" className="p-5">
          {loading ? <div className="flex justify-center items-center flex-1">Loading...</div>
          : !place ? <PlaceNotFound error={error} />
          : <ViewPlaceForm placeId={placeId} reactForm={reactForm}  />
          }
        </Container>
      </div>
    </>
  );
}

export default ViewPlace;
