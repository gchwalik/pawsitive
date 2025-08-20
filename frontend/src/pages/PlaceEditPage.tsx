import Navbar from '../components/Navbar';
import Container from '../components/Container';
import { EditForm, FormInput } from '../components/form/EntityForm';
import { useParams, useNavigate, Link } from 'react-router';
import { useEntity } from '../hooks/useEntity';
import type { Place, PlaceInput } from '../api/placesApi';
import { fetchPlace as getPlace, updatePlace, toPlaceInput } from '../api/placesApi';
import { usePlace } from '../hooks/usePlace';

import { ROUTES } from '../routes';
import { useForm, type SubmitHandler } from 'react-hook-form';

import ButtonContainer from '../components/Buttons';

import { useEffect } from 'react';

interface PlaceNotFoundProps {
  error: string | null;
}

function PlaceNotFound({error}: PlaceNotFoundProps) {
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

function EditPlaceForm({ 
  placeId, 
  onSubmit, 
  reactForm 
}: { 
  placeId: number; 
  onSubmit: SubmitHandler<PlaceInput>;
  reactForm: ReturnType<typeof useForm<PlaceInput>>;
}) {
  const { register } = reactForm;

  return (
    <form onSubmit={reactForm.handleSubmit(onSubmit)} className="form-attributes">
      <div className="form-attribute">
        <label className="label">Name:</label>
        <input 
          {...register("name", { required: "Name is required" })} 
          className="input"
          placeholder="Enter place name"
        />
      </div>
      
      <ButtonContainer>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
        <Link to={ROUTES.FRONTEND.PLACES_DELETE(placeId)} className="btn btn-danger">
          Delete
        </Link>
        <Link to={ROUTES.FRONTEND.ROOT} className="btn btn-primary">
          Cancel
        </Link>
      </ButtonContainer>
    </form>
  );
}

function EditPlace() {
  const { id: paramId } = useParams<{ id: string }>();
  const placeId = paramId ? parseInt(paramId) : null;
  if (!placeId || isNaN(placeId)) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center">
          <Container title="Edit Place" className="p-5">
            <PlaceNotFound error="Invalid place ID" />
          </Container>
        </div>
      </>
    );
  }

  const { place, loading, error } = usePlace();
  const reactForm = useForm<PlaceInput>();

  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && place) {
      reactForm.reset(toPlaceInput(place));
    }
  }, [place, loading, reactForm])

  const handleUpdate: SubmitHandler<PlaceInput> = async (placeInput: PlaceInput) => {
    try {
      if (!placeId) {
        console.error("No place id available.");
      return;
      }
      const response = updatePlace(placeInput, placeId);
      console.log('Place updated:', response);
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
        <Container title="Edit Place" className="p-5">
          {loading ? <div className="flex justify-center items-center flex-1">Loading...</div>
        : !place ? <PlaceNotFound error={error} />
        : <EditPlaceForm placeId={placeId} onSubmit={handleUpdate} reactForm={reactForm}></EditPlaceForm>
      }
        </Container>
      </div>
    </>
  );
}

export default EditPlace;
