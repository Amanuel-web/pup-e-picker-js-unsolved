import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { useState, useEffect } from "react";
import { Requests } from "../api";
import toast from "react-hot-toast";

export function FunctionalApp() {
  const [dogs, setDogs] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  const refetchDogs = () => Requests.getAllDogs().then(setDogs);

  useEffect(() => {
    refetchDogs();
  }, []);

  const handleFavoriteToggle = async (id, isFavorite) => {
    setIsLoading(true);
    try {
      await Requests.updateDog({
        id,
        isFavorite: isFavorite,
      });
      await refetchDogs();
    } catch (error) {
      toast.error("Error updating dog");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      await Requests.deleteDog(id);
      await refetchDogs();
    } catch (error) {
      toast.error("Error deleting dog");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddDog = async (dog) => {
    setIsLoading(true);
    return Requests.postDog(dog)
      .then(() => refetchDogs())
      .finally(() => setIsLoading(false));
  };

  const favDogs = dogs.filter((dog) => dog.isFavorite);
  const unfavDogs = dogs.filter((dog) => !dog.isFavorite);

  const dogsList = {
    all: dogs,
    favorited: favDogs,
    unfavorited: unfavDogs,
  };

  const counters = {
    favorited: favDogs.length,
    unfavorited: unfavDogs.length,
  };

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        counters={counters}
      >
        <div className="content-container">
          {activeTab === "create" ? (
            <FunctionalCreateDogForm
              isLoading={isLoading}
              addDog={handleAddDog}
            />
          ) : (
            <FunctionalDogs
              dogs={dogsList[activeTab]}
              isLoading={isLoading}
              onFavoriteToggle={handleFavoriteToggle}
              onDelete={handleDelete}
            />
          )}
        </div>
      </FunctionalSection>
    </div>
  );
}
