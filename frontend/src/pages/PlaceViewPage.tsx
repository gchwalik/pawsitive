import Header from '../components/Header';
import PlaceDetails from '../components/PlaceDetails';
import PlaceNotFound from '../components/PlaceNotFound';
import Container from '../components/Container';
import ButtonContainer from '../components/Buttons';
import { Link } from 'react-router';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { fetchPlace as getPlace, type Place } from "../api/placesApi";

function ViewPlace() {
  const [place, setPlace] = useState<Place | null>(null);
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
        <Container title={`${place?.name || ""}`}>
          {place ? (
            <PlaceDetails place={place} />
          ) : <PlaceNotFound />
          }
        </Container>
      </div>
    </>
  );
}

export default ViewPlace;
