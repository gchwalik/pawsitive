import { useParams } from 'react-router';
import { useEntity } from '../hooks/useEntity';
import { ROUTES } from '../routes';

import Navbar from '../components/Navbar';
import { ViewForm } from '../components/form/EntityForm';

import { fetchPlace as getPlace, toPlaceInput } from '../api/placesApi';
import type { Place, PlaceInput } from '../api/placesApi';
import { FormInput } from '../components/form/EntityForm';
import Container from '../components/Container';

function ViewPlace() {
  const { id: paramId } = useParams<{ id: string }>();
  const entityId = paramId ? parseInt(paramId) : undefined;
  const usePlace = (entityId: number | undefined) => {
    return useEntity<Place>({entityId, getEntity: getPlace});
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <Container title="View Place" className="p-5">
          <ViewForm<PlaceInput, Place>
            entityId={entityId}
            useEntity={usePlace}
            toEntityInput={toPlaceInput}
            editLink={ROUTES.FRONTEND.PLACES_EDIT(paramId ? parseInt(paramId) : -1)}
            deleteLink={ROUTES.FRONTEND.PLACES_DELETE(paramId ? parseInt(paramId) : -1)}
          >
            {(form) => (
              <>
                <FormInput<PlaceInput> label="Name:" fieldName="name" form={form} disabled/>
                {/* <FormInput<PlaceInput> label="Type:" fieldName="type_id" form={form} disabled/> */}
              </>
            )}
          </ViewForm>
        </Container>
      </div>
    </>
  );
}

export default ViewPlace;
