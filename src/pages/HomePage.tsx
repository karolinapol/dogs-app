import { useEffect, useState } from 'react';
import { Button, DogCard, Input } from '../components';

export interface Dog {
  id: number;
  name: string;
  breed: string;
  furColor: string;
  gender: string;
  age: number;
  weight: number;
  height: number;
}

export const HomePage = () => {
  const [isAddingModeActive, setIsAddingModeActive] = useState(false);
  const [dogsData, setDogsData] = useState<Dog[]>([]);

  const [newDogName, setNewDogName] = useState('');
  const [newDogBreed, setNewDogBreed] = useState('');
  const [newDogFurColor, setNewDogFurColor] = useState('');
  const [newDogGender, setNewDogGender] = useState('');
  const [newDogAge, setNewDogAge] = useState(0);
  const [newDogWeight, setNewDogWeight] = useState(0);
  const [newDogHeight, setNewDogHeight] = useState(0);

  useEffect(() => {
    getDogs();
  }, []);

  const getIsAnyNewDogFieldEmpty = (): boolean => {
    return (
      newDogName === '' ||
      newDogBreed === '' ||
      newDogFurColor === '' ||
      newDogGender === '' ||
      newDogAge === 0 ||
      newDogWeight === 0 ||
      newDogHeight === 0
    );
  };

  const getDogs = () => {
    fetch('https://localhost:7107/api/Dogs')
      .then((response) => response.json())
      .then((jsonData) => setDogsData(jsonData as Dog[]));
  };

  const addDog = async () => {
    const newDog = {
      name: newDogName,
      breed: newDogBreed,
      furColor: newDogFurColor,
      gender: newDogGender,
      age: newDogAge,
      weight: newDogWeight,
      height: newDogHeight,
    };

    const clearNewDogForm = (): void => {
      setNewDogName('');
      setNewDogBreed('');
      setNewDogFurColor('');
      setNewDogGender('');
      setNewDogAge(0);
      setNewDogWeight(0);
      setNewDogHeight(0);
    };

    await fetch(`https://localhost:7107/api/Dogs/`, {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify(newDog),
    });

    setIsAddingModeActive(false);
    clearNewDogForm();
    getDogs();
  };

  const editDog = async (editedDog: Dog) => {
    await fetch(`https://localhost:7107/api/Dogs/`, {
      method: 'PUT',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify(editedDog),
    });

    getDogs();
  };

  const removeDog = async (id: number) => {
    await fetch(`https://localhost:7107/api/Dogs/${id}`, {
      method: 'DELETE',
    });

    getDogs();
  };

  return (
    <div className="home-page content">
      <div className="dog-adding">
        {isAddingModeActive && (
          <div className="dog-adding__form">
            <Input
              name="name"
              id="name"
              value={newDogName}
              labelText="Imię"
              setState={setNewDogName}
              additionalClasses="mb-3"
              required={true}
              size="lg"
              type="text"
            />
            <Input
              name="breed"
              id="breed"
              value={newDogBreed}
              labelText="Rasa"
              setState={setNewDogBreed}
              additionalClasses="mb-3"
              required={true}
              size="lg"
              type="text"
            />
            <Input
              name="furColor"
              id="furColor"
              value={newDogFurColor}
              labelText="Kolor sierści"
              setState={setNewDogFurColor}
              additionalClasses="mb-3"
              required={true}
              size="lg"
              type="text"
            />
            <Input
              name="gender"
              id="gender"
              value={newDogGender}
              labelText="Płeć"
              setState={setNewDogGender}
              additionalClasses="mb-3"
              required={true}
              size="lg"
              type="text"
            />
            <Input
              name="age"
              id="age"
              value={newDogAge}
              labelText="Wiek"
              setState={setNewDogAge}
              additionalClasses="mb-3"
              required={true}
              size="lg"
              type="number"
            />
            <Input
              name="weight"
              id="weight"
              value={newDogWeight}
              labelText="Wysokość (cm)"
              setState={setNewDogWeight}
              additionalClasses="mb-3"
              required={true}
              size="lg"
              type="number"
            />
            <Input
              name="height"
              id="height"
              value={newDogHeight}
              labelText="Waga (kg)"
              setState={setNewDogHeight}
              additionalClasses="mb-5"
              required={true}
              size="lg"
              type="number"
            />
          </div>
        )}

        <div className="dog-adding__buttons">
          {!isAddingModeActive && (
            <Button
              text="Dodaj"
              type="button"
              isDisabled={isAddingModeActive}
              hasFixedWidth
              width="lg"
              color="yellow"
              onClick={() => setIsAddingModeActive(true)}
            ></Button>
          )}

          {isAddingModeActive && (
            <>
              <Button
                text="Dodaj"
                type="button"
                isDisabled={getIsAnyNewDogFieldEmpty()}
                width="lg"
                hasFixedWidth
                color="yellow"
                additionalClasses="mb-2"
                onClick={addDog}
              ></Button>

              <br />
              <Button
                text="Anuluj"
                type="button"
                isDisabled={!isAddingModeActive}
                width="lg"
                hasFixedWidth
                color="red"
                onClick={() => setIsAddingModeActive(false)}
              ></Button>
            </>
          )}
        </div>
      </div>

      <div className="dog-cards">
        {dogsData &&
          dogsData.map((dog: Dog, index) => {
            return (
              <DogCard
                key={index}
                id={dog.id}
                name={dog.name}
                breed={dog.breed}
                furColor={dog.furColor}
                gender={dog.gender}
                age={dog.age}
                weight={dog.weight}
                height={dog.height}
                removeDog={removeDog}
                editDog={editDog}
              ></DogCard>
            );
          })}
      </div>
    </div>
  );
};
