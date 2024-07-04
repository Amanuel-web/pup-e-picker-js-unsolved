import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { useState, useEffect } from "react";
import { Requests } from "../api";
import toast from "react-hot-toast";

export function FunctionalApp() {
  const [dogs, setDogs] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Requests.getAllDogs().then((data) => {
      setDogs(data);
      setIsLoading(false);
    });
  }, []);

  const handleFavoriteToggle = async (id, isFavorite) => {
    setIsLoading(true);
    try {
      const updatedDog = await Requests.updateDog({
        id,
        isFavorite: !isFavorite,
      });
      setDogs(dogs.map((dog) => (dog.id === id ? updatedDog : dog)));
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
      setDogs(dogs.filter((dog) => dog.id !== id));
    } catch (error) {
      toast.error("Error deleting dog");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredDogs = () => {
    if (activeTab === "favorited") {
      return dogs.filter((dog) => dog.isFavorite);
    } else if (activeTab === "unfavorited") {
      return dogs.filter((dog) => !dog.isFavorite);
    }
    return dogs;
  };

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        dogs={dogs}
      >
        <div className="content-container">
          {activeTab === "create" ? (
            <FunctionalCreateDogForm />
          ) : (
            <FunctionalDogs
              dogs={filteredDogs()}
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
