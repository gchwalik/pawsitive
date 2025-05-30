import { Link } from 'react-router';

import { usePlace } from '../hooks/usePlace';
import { ROUTES } from '../consts';

import Header from '../components/Header';
import PlaceDetails from '../components/PlaceDetails';
import PlaceNotFound from '../components/PlaceNotFound';
import Container from '../components/Container';
import ButtonContainer from '../components/Buttons';


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
            <>
            <PlaceDetails place={place} />
              <ButtonContainer>
              <Link to={ROUTES.PLACES_EDIT(place.id)} className="btn">Edit</Link>
              <Link to="/" className="btn">Back</Link>
            </ButtonContainer>
            </>
          ) : (
            <PlaceNotFound id={id} />
          )}
        </Container>
      </div>
    </>
  );
}

export default ViewPlace;
