import { FavoriteButton } from "./FavoriteButton";
import { TrashButton } from "./TrashButton";
import { UnfavoriteButton } from "./UnfavoriteButton";

// ! Do Not Make Changes To This File
export const DogCard = ({
  dog: { id, name, image, description, isFavorite },
  onTrashIconClick,
  onEmptyHeartClick,
  onHeartClick,
  isLoading,
}) => {
  return (
    <div className="dog-card">
      {isFavorite ? (
        <UnfavoriteButton onClick={onHeartClick} disabled={isLoading} />
      ) : (
        <FavoriteButton onClick={onEmptyHeartClick} disabled={isLoading} />
      )}
      <TrashButton onClick={onTrashIconClick} disabled={isLoading} />
      <div className="favorite-overlay">{isFavorite && "<3"}</div>
      {isLoading && <div className="loading-overlay"></div>}
      <p className="dog-name">{name}</p>
      <img src={image} alt={name} />
      <p className="dog-description">{description}</p>
    </div>
  );
};
