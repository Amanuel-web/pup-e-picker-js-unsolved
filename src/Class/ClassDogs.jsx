import { DogCard } from "../Shared/DogCard";
import { Component } from "react";

// Right now these dogs are constant, but in reality we should be getting these from our server
export class ClassDogs extends Component {
  render() {
    const { dogs, isLoading, onFavoriteToggle, onDelete } = this.props;

    return (
      <>
        {dogs.map((dog) => (
          <DogCard
            key={dog.id}
            dog={dog}
            isLoading={isLoading}
            onHeartClick={() => onFavoriteToggle(dog.id, true)}
            onEmptyHeartClick={() => onFavoriteToggle(dog.id, false)}
            onTrashIconClick={() => onDelete(dog.id)}
          />
        ))}
      </>
    );
  }
}
