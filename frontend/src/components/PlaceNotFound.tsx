import { Link } from "react-router";

import ButtonContainer from "./Buttons";
import { ROUTES } from "../routes";

interface PlaceNotFoundProps {
  error: string | null;
}

function PlaceNotFound({ error }: PlaceNotFoundProps) {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex justify-center items-center flex-1">
        <p>{error}</p>
      </div>
      <ButtonContainer>
        <Link to={ROUTES.FRONTEND.ROOT} className="btn btn-primary">
          Back
        </Link>
      </ButtonContainer>
    </div>
  );
}

export default PlaceNotFound;
