import Header from '../components/Header';
import PlaceDetails from '../components/PlaceDetails';
import Container from '../components/Container';

function ViewPlace() {
  return (
    <>
      <Header />
      {/* Main Content */}
      <div className="flex justify-center">
        <Container>
          <PlaceDetails />
        </Container>
      </div>
    </>
  );
}

export default ViewPlace;
