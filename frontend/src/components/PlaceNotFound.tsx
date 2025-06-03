import { Link } from 'react-router';
import ButtonContainer from './Buttons';
import { ROUTES } from '../routes';

interface PlaceNotFoundProps {
  id: string | undefined;
}

function PlaceNotFound({id}: PlaceNotFoundProps) {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex justify-center items-center flex-1">
        <p>{`No place with id: ${id}`}</p>
      </div>
      <ButtonContainer>
        <Link to={ROUTES.FRONTEND.ROOT} className="btn btn-primary">Back</Link>
      </ButtonContainer>
    </div>
  );
}

export default PlaceNotFound;
