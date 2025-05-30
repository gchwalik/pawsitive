import Header from '../components/Header';
import PlaceForm from '../components/PlaceForm';
import Container from '../components/Container';
import { usePlace } from '../hooks/usePlace';
import PlaceNotFound from '../components/PlaceNotFound';

function EditPlace() {
  const { place, loading, error, id } = usePlace();

  return (
    <>
      <Header />
      <div className="flex justify-center">
        <Container title="Edit Place">
          {loading ? (
            <div className="flex justify-center items-center flex-1">Loading...</div>
          ) : place ? (
            <>
            <PlaceForm placeEntity={place} id={place.id}/>
            </>
          ) : (
            <PlaceNotFound id={id} />
          )}
        </Container>
      </div>
    </>
  );
}

export default EditPlace;
