import type { SubmitHandler, UseFormReturn } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

import type { PlaceInput } from "../api/placesApi";
import { createPlace } from "../api/placesApi";
import ButtonContainer from "../components/Buttons";
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import { ROUTES } from "../routes";

interface CreatePlaceFormProps {
  onSubmit: SubmitHandler<PlaceInput>;
  reactForm: UseFormReturn<PlaceInput>;
}

function CreatePlaceForm({ onSubmit, reactForm }: CreatePlaceFormProps) {
  const { register, handleSubmit } = reactForm;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-attributes">
      <div className="form-attribute">
        <label className="label">Name:</label>
        <input
          {...register("name", { required: "Name is required" })}
          className="input"
          placeholder="Enter place name"
        />
      </div>
      <ButtonContainer>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
        <Link to={ROUTES.FRONTEND.ROOT} className="btn btn-primary">
          Cancel
        </Link>
      </ButtonContainer>
    </form>
  );
}

function CreatePlace() {
  const navigate = useNavigate();

  const handleCreate: SubmitHandler<PlaceInput> = async (
    placeInput: PlaceInput,
  ) => {
    try {
      const response = await createPlace(placeInput);
      console.log("Place created:", response);
      // After successful creation, navigate to home
      navigate(ROUTES.FRONTEND.ROOT);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const reactForm = useForm<PlaceInput>({});

  return (
    <Container title="Create Place" className="p-5">
      <CreatePlaceForm onSubmit={handleCreate} reactForm={reactForm} />
    </Container>
  );
}

export default CreatePlace;
