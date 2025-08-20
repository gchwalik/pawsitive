import { useNavigate, Link } from 'react-router';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import ButtonContainer from '../components/Buttons';
import Container from '../components/Container';
import Navbar from '../components/Navbar';

import type { PlaceInput } from '../api/placesApi';
import { createPlace } from '../api/placesApi';

import { ROUTES } from '../routes';


function CreatePlace() {
  const navigate = useNavigate();

  const handleCreate: SubmitHandler<PlaceInput> = async (placeInput: PlaceInput) => {
    try {
      const response = createPlace(placeInput);
      console.log('Place created:', response);
      // After successful creation, navigate to home
      navigate(ROUTES.FRONTEND.ROOT);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const { register, handleSubmit } = useForm<PlaceInput>({})

  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <Container title="Create Place" className="p-5">
          <form onSubmit={handleSubmit(handleCreate)} className="form-attributes">
            <div className="form-attribute">
              <label className="label">Name:</label>
              <input {...register("name", {required: "Name is required"})} className="input"/>
            </div>
              <ButtonContainer>
                <button type="submit" className="btn btn-primary">Create</button>
                <Link to={ROUTES.FRONTEND.ROOT} className="btn btn-primary">Cancel</Link>
              </ButtonContainer>
          </form>
        </Container>
      </div>
    </>
  );
}

export default CreatePlace;
