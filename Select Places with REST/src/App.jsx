import { useRef, useState, useCallback, useEffect } from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';

function App() {
  const selectedPlace = useRef();

  const [userPlaces, setUserPlaces] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    fetchUserPlaces();
  }, []);

  async function fetchUserPlaces(){
    await fetch('http://localhost:3000/user-places')
      .then(res => res.json())
      .then(resData => {
          console.log(resData)
          setUserPlaces(resData.places);
      })
  }

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    if(!userPlaces.find((element) => element.id == selectedPlace.id)){
      await fetch('http://localhost:3000/user-places', {
        method: "PUT",
        body: JSON.stringify({
            places: [...userPlaces, selectedPlace]
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(resData => {
        console.log(resData);
      })
      .catch((error) => console.log(error))

      console.log("----------");
      
      fetchUserPlaces();

    }
    
  }

  async function handleRemovePlace() {

    await fetch('http://localhost:3000/delete-place/'+selectedPlace.current.id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
     })
    .catch((error) => console.log(error));
    
    setModalIsOpen(false);

    console.log("----------");
      
      fetchUserPlaces();
  }

  return (
    <>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
        />

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
