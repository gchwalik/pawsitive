import Header from '../components/Header';
import PlaceDetails from '../components/PlaceDetails';
import PlaceNotFound from '../components/PlaceNotFound';
import Container from '../components/Container';
import { usePlace } from '../hooks/usePlace';
import { deletePlace } from '../api/placesApi';

import { Link, useNavigate,  } from 'react-router';
import ButtonContainer from '../components/Buttons';
import { ROUTES } from '../routes';

function DeletePlace() {
  const { place, loading, paramId } = usePlace();

  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!place) {
      console.error('No place to delete');
      return;
    }

    try {
      await deletePlace(place.id);
      console.log('Place deleted:', place.name);
      navigate(ROUTES.FRONTEND.ROOT); // Go back to list
    } catch (error) {
      console.error('Error deleting place:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="flex justify-center">
        <Container title={ place?.name || ""}>
          {loading ? (
            <div className="flex justify-center items-center flex-1">Loading...</div>
          ) : place ? (
            <>
            <PlaceDetails place={place} />
            <p className='font-medium px-10 pb-4 text-rose-800'>Are you sure you want to delete {`${place.name}`}?</p>
            <ButtonContainer>
              <button onClick={handleDelete} className="btn btn-danger">Yes</button>
              <Link to={ROUTES.FRONTEND.ROOT} className="btn btn-primary">Back</Link>
            </ButtonContainer>
            </>            
          ) : (
            <PlaceNotFound id={paramId} />
          )}
        </Container>
      </div>
    </>
  );
}

export default DeletePlace;
