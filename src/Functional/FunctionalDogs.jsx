import { DogCard } from "../Shared/DogCard";

// Right now these dogs are constant, but in reality we should be getting these from our server
export const FunctionalDogs = ({
  dogs,
  isLoading,
  onFavoriteToggle,
  onDelete,
}) => {
  //  the "<> </>"" are called react fragments, it's like adding all the html inside
  // without adding an actual html element

  return (
    <>
      {dogs.map((dog) => (
        <DogCard
          key={dog.id}
          dog={dog}
          isLoading={isLoading}
          onHeartClick={() => onFavoriteToggle(dog.id, !dog.isFavorite)}
          onEmptyHeartClick={() => onFavoriteToggle(dog.id, !dog.isFavorite)}
          onTrashIconClick={() => onDelete(dog.id)}
        />
      ))}
    </>
  );
};
