import Navbar from '../components/Navbar';
import PlaceForm from '../components/PlaceForm';
import Container from '../components/Container';
import { usePlace } from '../hooks/usePlace';
import PlaceNotFound from '../components/PlaceNotFound';

function EditPlace() {
  const { place, loading, paramId } = usePlace();

  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <Container title="Edit Place">
          {loading ? (
            <div className="flex justify-center items-center flex-1">Loading...</div>
          ) : place ? (
            <>
            <PlaceForm place={place} id={place.id}/>
            </>
          ) : (
            <PlaceNotFound id={paramId} />
          )}
        </Container>
      </div>
    </>
  );
}

export default EditPlace;
