import { useEffect, useState } from 'react';
import Places from './Places.jsx';

export default function AvailablePlaces({ onSelectPlace }) {

  const [places, setPlaces] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/places')
      .then(res => res.json())
      .then((resData) => {
        setPlaces(resData.places);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);


  return (
    <Places
      title="Available Places"
      places={places}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
