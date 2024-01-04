import { useState } from 'react';
import { Button, Input } from '../components';
import { Dog } from '../pages';
import { useNavigate } from 'react-router-dom';

interface DogCardProps {
  id: number;
  name: string;
  breed: string;
  furColor: string;
  gender: string;
  age: number;
  weight: number;
  height: number;
  removeDog: (id: number) => void;
  editDog: (editedDog: Dog) => void;
}

export const DogCard = ({
  id,
  name,
  breed,
  furColor,
  gender,
  age,
  weight,
  height,
  removeDog,
  editDog,
}: DogCardProps): JSX.Element => {
  const navigate = useNavigate();
  const [isEditingModeActive, setIsEditingModeActive] = useState(false);

  const [editedDogName, setEditedDogName] = useState(name);
  const [editedDogBreed, setEditedDogBreed] = useState(breed);
  const [editedDogFurColor, setEditedDogFurColor] = useState(furColor);
  const [editedDogGender, setEditedDogGender] = useState(gender);
  const [editedDogAge, setEditedDogAge] = useState(age);
  const [editedDogWeight, setEditedDogWeight] = useState(weight);
  const [editedDogHeight, setEditedDogHeight] = useState(height);

  const onEditDog = (): void => {
    const editedDog = {
      id,
      name: editedDogName,
      breed: editedDogBreed,
      furColor: editedDogFurColor,
      gender: editedDogFurColor,
      age: editedDogAge,
      weight: editedDogAge,
      height: editedDogHeight,
    };

    setIsEditingModeActive(false);
    editDog(editedDog);
  };

  const getIsAnyEditedDogFieldEmpty = (): boolean => {
    return (
      editedDogName === '' ||
      editedDogBreed === '' ||
      editedDogFurColor === '' ||
      editedDogGender === '' ||
      editedDogAge === 0 ||
      editedDogWeight === 0 ||
      editedDogHeight === 0
    );
  };

  const resetEditedDogForm = (): void => {
    setEditedDogName(name);
    setEditedDogBreed(breed);
    setEditedDogFurColor(furColor);
    setEditedDogGender(gender);
    setEditedDogAge(age);
    setEditedDogWeight(weight);
    setEditedDogHeight(height);

    setIsEditingModeActive(false);
  };

  const navigateToDetails = () => {
    navigate(`/${id}`);
  };

  return (
    <div className="dog-card">
      <div className="dog-card__content">
        {isEditingModeActive ? (
          <>
            <Input
              name="name"
              id="name"
              value={editedDogName}
              labelText="Imię"
              setState={setEditedDogName}
              additionalClasses="mb-3"
              required={true}
              size="lg"
              type="text"
            />
            <Input
              name="breed"
              id="breed"
              value={editedDogBreed}
              labelText="Rasa"
              setState={setEditedDogBreed}
              additionalClasses="mb-3"
              required={true}
              size="lg"
              type="text"
            />
            <Input
              name="furColor"
              id="furColor"
              value={editedDogFurColor}
              labelText="Kolor sierści"
              setState={setEditedDogFurColor}
              additionalClasses="mb-3"
              required={true}
              size="lg"
              type="text"
            />
            <Input
              name="gender"
              id="gender"
              value={editedDogGender}
              labelText="Płeć"
              setState={setEditedDogGender}
              additionalClasses="mb-3"
              required={true}
              size="lg"
              type="text"
            />
            <Input
              name="age"
              id="age"
              value={editedDogAge}
              labelText="Wiek"
              setState={setEditedDogAge}
              additionalClasses="mb-3"
              required={true}
              size="lg"
              type="number"
            />
            <Input
              name="weight"
              id="weight"
              value={editedDogWeight}
              labelText="Wysokość (cm)"
              setState={setEditedDogWeight}
              additionalClasses="mb-3"
              required={true}
              size="lg"
              type="number"
            />
            <Input
              name="height"
              id="height"
              value={editedDogHeight}
              labelText="Waga (kg)"
              setState={setEditedDogHeight}
              additionalClasses="mb-5"
              required={true}
              size="lg"
              type="number"
            />
          </>
        ) : (
          <>
            <p>
              <strong>Imię: </strong>
              {name}
            </p>
            <p>
              <strong>Rasa: </strong>
              {breed}
            </p>
            <p>
              <strong>Kolor sierści: </strong>
              {furColor}
            </p>
            <p>
              <strong>Płeć: </strong>
              {gender}
            </p>
            <p>
              <strong>Wiek: </strong>
              {age} lat
            </p>
            <p>
              <strong>Waga: </strong>
              {weight} kg
            </p>
            <p>
              <strong>Wysokość: </strong>
              {height} cm
            </p>
          </>
        )}

        {!isEditingModeActive && (
          <>
            <Button
              text="Edytuj"
              type="button"
              additionalClasses="mt-5 mb-2"
              color="yellow"
              onClick={() => setIsEditingModeActive(true)}
            ></Button>
            <Button
              text="Szczegóły"
              type="button"
              additionalClasses="mb-2"
              color="blue"
              onClick={navigateToDetails}
            ></Button>

            <Button text="Usuń" type="button" color="red" onClick={() => removeDog(id)}></Button>
          </>
        )}

        {isEditingModeActive && (
          <>
            <Button
              text="Zapisz"
              type="button"
              additionalClasses="mt-5 mb-2"
              color="yellow"
              isDisabled={getIsAnyEditedDogFieldEmpty()}
              onClick={() => onEditDog()}
            ></Button>
            <Button text="Anuluj" type="button" color="red" onClick={resetEditedDogForm}></Button>
          </>
        )}
      </div>
    </div>
  );
};

export default DogCard;
