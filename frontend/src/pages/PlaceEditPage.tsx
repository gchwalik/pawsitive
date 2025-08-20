import Navbar from '../components/Navbar';
import Container from '../components/Container';
import { EditForm, FormInput } from '../components/form/EntityForm';
import { useParams, useNavigate } from 'react-router';
import { useEntity } from '../hooks/useEntity';
import type { Place, PlaceInput } from '../api/placesApi';
import { fetchPlace as getPlace, updatePlace, toPlaceInput } from '../api/placesApi';

import { ROUTES } from '../routes';
import { type SubmitHandler } from 'react-hook-form';

function EditPlace() {
  const { id: paramId } = useParams<{ id: string }>();
  const entityId = paramId ? parseInt(paramId, 10) : undefined;
  const usePlace = (entityId: number | undefined) => {
    return useEntity<Place>({entityId, getEntity: getPlace});
  }

  const navigate = useNavigate();

  const handleUpdate: SubmitHandler<PlaceInput> = async (placeInput: PlaceInput) => {
    try {
      if (!entityId) {
        console.error("No place id available.");
      return;
      }
      const response = updatePlace(placeInput, entityId);
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
          <EditForm<PlaceInput, Place>
            entityId={entityId}
            useEntity={usePlace}
            toEntityInput={toPlaceInput}
            onSubmit={handleUpdate}
            deleteLink={ROUTES.FRONTEND.PLACES_DELETE(paramId ? parseInt(paramId, 10) : -1)}
          >
            {(form) => (
              <>
                <FormInput<PlaceInput> label="Name:" fieldName="name" form={form}/>
              </>
            )}
          </EditForm>
        </Container>
      </div>
    </>
  );
}

export default EditPlace;
