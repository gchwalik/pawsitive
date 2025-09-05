import { CaretDownIcon } from "@phosphor-icons/react";
import {
  Button,
  Header,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from "react-aria-components";
import type { SubmitHandler, UseFormReturn } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import type { PlaceInput } from "../api/placesApi";
import { createPlace } from "../api/placesApi";
import AppLink from "../components/AppLink";
import ButtonContainer from "../components/Buttons";
import Container from "../components/Container";
import { ROUTES } from "../routes";

interface CreatePlaceFormProps {
  className?: string;
  onSubmit: SubmitHandler<PlaceInput>;
  reactForm: UseFormReturn<PlaceInput>;
}

function CreatePlaceForm({
  className = "",
  onSubmit,
  reactForm,
}: CreatePlaceFormProps) {
  const { register, handleSubmit } = reactForm;

  const placeTypes: { name: string }[] = [
    { name: "Hiking Trail" },
    { name: "Park" },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`form flex-1 ${className}`}
    >
      <div className="form-fields flex-1">
        <div className="flex items-center form-attribute">
          <Label className="label">Name:</Label>
          <input
            {...register("name", { required: "Name is required" })}
            className="input"
            placeholder="Enter place name"
          />
        </div>
        <div className="flex items-center form-attribute">
          <Label className="label">Type:</Label>
          <Select placeholder="Select a type">
            <Button className="flex items-center text-ellipses w-50 h-9 bg-white border border-neutral-300 rounded-md px-3  text-left transition-all duration-200 hover:border-neutral-500">
              <SelectValue className="flex-1"/>
              <span aria-hidden="true">
                <CaretDownIcon className="ml-1" size={16} />
              </span>
            </Button>
            <Popover className="max-h-60 w-(--trigger-width) overflow-auto rounded-md bg-white border-neutral-200 border-1">
              <ListBox className="p-1 flex flex-col gap-1">
                {placeTypes.length === 0 ? (
                  <ListBoxItem className="px-3 py-1">
                    No place types yet
                  </ListBoxItem>
                ) : (
                  <>
                    {placeTypes.map((placeType) => (
                      <ListBoxItem className="px-3 py-1">
                        {placeType.name}
                      </ListBoxItem>
                    ))}
                  </>
                )}
              </ListBox>
            </Popover>
          </Select>
        </div>
      </div>
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
        <Header className="text-center header">Create Place</Header>
        <CreatePlaceForm
          className="px-10 pt-2"
          onSubmit={handleCreate}
          reactForm={reactForm}
        />
      </Container>
    </div>
  );
}

export default CreatePlace;
