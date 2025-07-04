import Header from '../components/Header';
import { useParams } from 'react-router';
import { fetchPlace as getPlace, toPlaceInput } from '../api/placesApi';
import { useEntity } from '../hooks/useEntity';
import type { Place, PlaceInput } from '../api/placesApi';
import { EditForm, FormInput } from '../components/form/EntityForm';
import { ROUTES } from '../routes';

function EditPlace() {
  const { id: paramId } = useParams<{ id: string }>();
  const entityId = paramId ? parseInt(paramId) : undefined;
  const usePlace = (entityId: number | undefined) => {
    return useEntity<Place>({entityId, getEntity: getPlace});
  }

  return (
    <>
      <Header />
      <EditForm<PlaceInput, Place>
        containerTitle="Edit Place"
        entityId={entityId}
        useEntity={usePlace}
        toEntityInput={toPlaceInput}
        editLink={ROUTES.FRONTEND.PLACES_EDIT}
        deleteLink={ROUTES.FRONTEND.PLACES_DELETE}
      >
        {(form) => (
          <>
            <FormInput<PlaceInput> label="Name:" fieldName="name" form={form} />
            <FormInput<PlaceInput> label="Type:" fieldName="type_id" form={form} />
          </>
        )}
      </EditForm>
    </>
  );



  // const { place, loading, paramId } = usePlace();

  // return (
  //   <>
  //     <Header />
  //     <div className="flex justify-center">
  //       <Container title="Edit Place">
  //         {loading ? (
  //           <div className="flex justify-center items-center flex-1">Loading...</div>
  //         ) : place ? (
  //           <>
  //           <PlaceForm place={place} id={place.id}/>
  //           </>
  //         ) : (
  //           <PlaceNotFound id={paramId} />
  //         )}
  //       </Container>
  //     </div>
  //   </>
  // );
}

export default EditPlace;
