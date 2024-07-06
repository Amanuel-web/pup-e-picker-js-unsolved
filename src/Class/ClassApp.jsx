import { Component } from "react";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { ClassDogs } from "./ClassDogs";
import { ClassSection } from "./ClassSection";
import { Requests } from "../api";
import toast from "react-hot-toast";

export class ClassApp extends Component {
  state = {
    dogs: [],
    activeTab: "all",
    isLoading: false,
  };

  componentDidMount() {
    this.refetchDogs();
  }

  refetchDogs = () => {
    Requests.getAllDogs()
      .then((data) => {
        if (!data || !Array.isArray(data)) {
          throw new Error("Invalid data format");
        }
        this.setState({ dogs: data });
      })
      .catch((error) => {
        toast.error("Error fetching dogs");
      });
  };

  handleFavoriteToggle = async (id, isFavorite) => {
    this.setState({ isLoading: true });
    try {
      await Requests.updateDog({ id, isFavorite });
      this.refetchDogs();
    } catch (error) {
      toast.error("Error updating dog");
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleDelete = async (id) => {
    this.setState({ isLoading: true });
    try {
      await Requests.deleteDog(id);
      this.refetchDogs();
      this.setState((prevState) => ({
        dogs: prevState.dogs.filter((dog) => dog.id !== id),
      }));
    } catch (error) {
      toast.error("Error deleting dog");
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleAddDog = async (dog) => {
    this.setState({ isLoading: true });
    return Requests.postDog(dog)
      .then(() => this.refetchDogs())
      .finally(() => this.setState({ isLoading: false }));
  };

  setActiveTab = (tab) => {
    this.setState({ activeTab: tab });
  };

  render() {
    const { dogs, activeTab, isLoading } = this.state;

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
          <h1>pup-e-picker (Class)</h1>
        </header>
        <ClassSection
          activeTab={activeTab}
          setActiveTab={this.setActiveTab}
          counters={counters}
        >
          <div className="content-container">
            {activeTab === "create" ? (
              <ClassCreateDogForm
                isLoading={isLoading}
                addDog={this.handleAddDog}
              />
            ) : (
              <ClassDogs
                dogs={dogsList[activeTab] || []}
                isLoading={isLoading}
                onFavoriteToggle={this.handleFavoriteToggle}
                onDelete={this.handleDelete}
              />
            )}
          </div>
        </ClassSection>
      </div>
    );
  }
}
