
import ButtonContainer from "./Buttons";
import { ROUTES } from "../routes";

import AppLink from "./AppLink";

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
        <AppLink to={ROUTES.FRONTEND.ROOT} className="btn btn-primary">
          Back
        </AppLink>
      </ButtonContainer>
    </div>
  );
}

export default PlaceNotFound;
