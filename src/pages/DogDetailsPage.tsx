import { useEffect, useState } from 'react';
import { Dog } from '.';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components';

export const DogDetailsPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [dogData, setDogData] = useState<Dog | null>(null);

  useEffect(() => {
    getDogs();
  }, []);

  const getDogs = () => {
    fetch(`https://localhost:7107/api/Dogs/${params.dogId}`)
      .then((response) => response.json())
      .then((jsonData) => setDogData(jsonData as Dog));
  };

  return (
    <div className="dog-details-page content">
      <div className="dog-details-card">
        {dogData && (
          <>
            <p>
              <strong>Id: </strong>
              {dogData.id}
            </p>
            <p>
              <strong>Imię: </strong>
              {dogData.name}
            </p>
            <p>
              <strong>Rasa: </strong>
              {dogData.breed}
            </p>
            <p>
              <strong>Kolor sierści: </strong>
              {dogData.furColor}
            </p>
            <p>
              <strong>Płeć: </strong>
              {dogData.gender}
            </p>
            <p>
              <strong>Wiek: </strong>
              {dogData.age} lat
            </p>
            <p>
              <strong>Waga: </strong>
              {dogData.weight} kg
            </p>
            <p>
              <strong>Wysokość: </strong>
              {dogData.height} cm
            </p>
          </>
        )}

        <Button
          text="Wróc"
          type="button"
          additionalClasses="mt-5"
          color="yellow"
          onClick={() => navigate('..')}
        ></Button>
      </div>
    </div>
  );
};
