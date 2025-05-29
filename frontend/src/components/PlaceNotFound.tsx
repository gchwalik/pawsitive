import { Link } from 'react-router';
import ButtonContainer from './Buttons';


function PlaceNotFound() {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex justify-center items-center flex-1">
        <p>Place not found</p>
      </div>
      <ButtonContainer>
        <Link to="/" className="btn">Back</Link>
      </ButtonContainer>
    </div>
  );
}

export default PlaceNotFound;
