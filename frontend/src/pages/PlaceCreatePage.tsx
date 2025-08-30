import type { SubmitHandler, UseFormReturn } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import type { PlaceInput } from "../api/placesApi";
import { createPlace } from "../api/placesApi";
import AppLink from "../components/AppLink";
import ButtonContainer from "../components/Buttons";
import Container from "../components/Container";
import { ROUTES } from "../routes";

import { Header } from "react-aria-components";

interface CreatePlaceFormProps {
  onSubmit: SubmitHandler<PlaceInput>;
  reactForm: UseFormReturn<PlaceInput>;
}

function CreatePlaceForm({ onSubmit, reactForm }: CreatePlaceFormProps) {
  const { register, handleSubmit } = reactForm;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form px-10 pt-2 flex-1">
      <div className="form-fields flex-1">
      <div className="form-attribute">
        <label className="label">Name:</label>
        <input
          {...register("name", { required: "Name is required" })}
          className="input"
          placeholder="Enter place name"
        />
      </div></div>
      <ButtonContainer className="mb-5">
        <button type="submit" className="btn btn-primary">
          Create
        </button>
        <AppLink to={ROUTES.FRONTEND.ROOT} className="btn btn-primary">
          Cancel
        </AppLink>
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
    <div className="flex justify-center">
    <Container className="bg-amber-50 rounded-lg m-5 pt-1 shadow-lg flex flex-col">
      <Header
        className="text-center header"
      >
        Create Place
      </Header>
      <CreatePlaceForm onSubmit={handleCreate} reactForm={reactForm} />
    </Container>
    </div>
  );
}

export default CreatePlace;
