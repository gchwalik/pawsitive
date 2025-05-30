import Header from '../components/Header';
import PlaceDetails from '../components/PlaceDetails';
import PlaceNotFound from '../components/PlaceNotFound';
import Container from '../components/Container';
import { usePlace } from '../hooks/usePlace';


function ViewPlace() {
  const { place, loading, error, id } = usePlace();

  return (
    <>
      <Header />
      <div className="flex justify-center">
        <Container title={ place?.name || ""}>
          {loading ? (
            <div className="flex justify-center items-center flex-1">Loading...</div>
          ) : place ? (
            <PlaceDetails place={place} />
          ) : (
            <PlaceNotFound id={id} />
          )}
        </Container>
      </div>
    </>
  );
}

export default ViewPlace;
