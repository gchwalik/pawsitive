import Header from '../components/Header';
import PlaceForm from '../components/PlaceForm';
import Container from '../components/Container';

function CreatePlace() {
  return (
    <>
        <Header />
        {/* Main Content */}
        <div className="flex justify-center">
          <Container title="Create Place">
            <PlaceForm />
          </Container>
        </div>
    </>
  );
}

export default CreatePlace;
