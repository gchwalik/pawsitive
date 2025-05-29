import Header from '../components/Header';
import PlaceDetails from '../components/PlaceDetails';
import PlaceNotFound from '../components/PlaceNotFound';
import Container from '../components/Container';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { fetchPlace as getPlace, type PlaceEntity } from "../api/placesApi";

function ViewPlace() {
  const [place, setPlace] = useState<PlaceEntity | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) {
      console.error("No ID provided in URL parameters");
      return;
    }

    getPlace(parseInt(id))
      .then((response) => {
        setPlace(response);
      })
      .catch((error) => {
        console.error("Error fetching place:", error);
      });
  }, [id]);


  return (
    <>
      <Header />
      <div className="flex justify-center">
        <Container title={place?.name || "Error"}>
          { place ? <PlaceDetails place={place}/> : <PlaceNotFound id={id}/> }
        </Container>
      </div>
    </>
  );
}

export default ViewPlace;
